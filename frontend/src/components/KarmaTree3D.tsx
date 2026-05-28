import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

// ─── CONSTANTS ───
const CLUSTER_THRESHOLD = 10;
const TRUNK_COLOR = "#2A1A0A";
const BRANCH_COLOR = "#3D2512";

// TONE MÀU LÁ CHỦ ĐẠO (Xanh lá làm chủ đạo xen lẫn sắc Vàng công đức)
const GREEN_LEAF_COLORS = [
    "#2d5a27", "#3b7a33", "#4c9a41", "#244c1e", "#5cb85c",
    "#1e3f20", "#163822", "#22543d", "#276749", "#2f855a"
];
const YELLOW_LEAF_COLORS = [
    "#FFB300", "#FFC107", "#FFA000", "#FF8F00", "#F5B041"
];
// Sắc màu chùm quả/đèn công đức chuyển sang tone xanh lá chủ đạo
const CLUSTER_COLORS = [
    "#2d5a27", "#3b7a33", "#4c9a41", 
    "#244c1e", "#22543d", "#276749"  
];

// TONE MÀU SÁNG SỚM (MORNING) MỜ SƯƠNG NHẸ
const FOG_COLOR = "#d0ccc0"; // Giảm độ chói của bầu trời/sương
const AMBIENT_COLOR = "#a6a096"; // Sáng hơn
const GRASS_COLOR = "#3b5e2b";

// ─── SEEDED RANDOM ───
function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 213647;
        return (s - 1) / 213647;
    };
}

// ─── ROOT GEOMETRY GENERATION ───
interface RootData {
    start: THREE.Vector3;
    end: THREE.Vector3;
    radius: number;
}

function generateTreeRoots(): RootData[] {
    const roots: RootData[] = [];
    const rand = seededRandom(99);

    function addRoot(start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number) {
        if (depth > 3 || radius < 0.02) return;
        const end = start.clone().add(direction.clone().multiplyScalar(length));

        // Đảm bảo rễ cây luôn bò trên mặt đất (mặt đất ở y = -1) để người dùng có thể thấy rõ
        if (end.y < -0.98) {
            end.y = -0.98;
        }

        roots.push({ start: start.clone(), end: end.clone(), radius });

        const numChildren = 2;
        for (let i = 0; i < numChildren; i++) {
            const spreadAngle = 0.3 + rand() * 0.4;
            const rotAngle = ((Math.PI * 2) / numChildren) * i + (rand() - 0.5) * 1.0;
            const newDir = direction.clone();
            const axis = new THREE.Vector3(Math.cos(rotAngle), 0, Math.sin(rotAngle)).normalize();
            newDir.applyAxisAngle(axis, spreadAngle);
            newDir.y = -0.15 - rand() * 0.2; // xuôi nhẹ xuống mặt đất
            newDir.normalize();

            const newLength = length * (0.7 + rand() * 0.2);
            const newRadius = radius * (0.65 + rand() * 0.1);
            addRoot(end.clone(), newDir, newLength, newRadius, depth + 1);
        }
    }

    const numRoots = 7; // tăng số nhánh rễ cây lớn tỏa ra các hướng
    for (let i = 0; i < numRoots; i++) {
        const angle = (i / numRoots) * Math.PI * 2 + (rand() - 0.5) * 0.2;
        // Bắt đầu trên gốc thân một chút (ở y = -0.4) để thấy rễ cắm xuống đất
        const startPos = new THREE.Vector3(Math.cos(angle) * 0.25, -0.4, Math.sin(angle) * 0.25);
        const dir = new THREE.Vector3(Math.cos(angle), -0.6, Math.sin(angle)).normalize();

        // Chiều dài gốc rễ ngắn hơn, bằng khoảng 1/3 cành chính (khoảng 0.8 đến 1.2)
        addRoot(startPos, dir, 0.8 + rand() * 0.4, 0.35, 0);
    }
    return roots;
}

// ─── TREE GEOMETRY GENERATION ───
interface BranchData {
    start: THREE.Vector3;
    end: THREE.Vector3;
    radius: number;
    depth: number;
    id: number;
}

function generateTreeBranches(): BranchData[] {
    const branches: BranchData[] = [];
    let id = 0;
    const rand = seededRandom(42);

    function addBranch(start: THREE.Vector3, direction: THREE.Vector3, length: number, radius: number, depth: number) {
        if (depth > 5 || radius < 0.02) return;
        const end = start.clone().add(direction.clone().multiplyScalar(length));
        branches.push({ start: start.clone(), end: end.clone(), radius, depth, id: id++ });
        const numChildren = depth < 2 ? 3 + Math.floor(rand() * 2) : 2 + Math.floor(rand() * 2);

        for (let i = 0; i < numChildren; i++) {
            const spreadAngle = 0.3 + rand() * 0.6;
            const rotAngle = ((Math.PI * 2) / numChildren) * i + (rand() - 0.5) * 1.2;
            const newDir = direction.clone();
            const axis1 = new THREE.Vector3(Math.cos(rotAngle), 0, Math.sin(rotAngle)).normalize();
            newDir.applyAxisAngle(axis1, spreadAngle);
            if (depth < 2) newDir.y = Math.max(newDir.y, 0.15);

            const newLength = length * (0.55 + rand() * 0.25);
            const newRadius = radius * (0.5 + rand() * 0.2);
            addBranch(end.clone(), newDir.normalize(), newLength, newRadius, depth + 1);
        }
    }

    const trunkTop = new THREE.Vector3(0.15, 3.5, -0.1);
    branches.push({ start: new THREE.Vector3(0, -1, 0), end: trunkTop.clone(), radius: 0.65, depth: 0, id: id++ });

    const mainDirs = [
        new THREE.Vector3(-0.7, 0.6, 0.3), new THREE.Vector3(0.8, 0.5, -0.2),
        new THREE.Vector3(-0.3, 0.7, -0.6), new THREE.Vector3(0.4, 0.55, 0.7),
        new THREE.Vector3(-0.5, 0.8, 0.1), new THREE.Vector3(0.6, 0.45, -0.5),
    ];
    mainDirs.forEach((dir) => {
        addBranch(trunkTop.clone(), dir.normalize(), 2.2 + rand() * 1.2, 0.28 + rand() * 0.12, 1);
    });

    return branches;
}

function getLeafPositions(branches: BranchData[]): THREE.Vector3[] {
    return branches.filter((b) => b.depth >= 3).map((b) => b.end.clone());
}

function getClusterPositions(branches: BranchData[]): { position: THREE.Vector3; direction: THREE.Vector3 }[] {
    return branches.filter((b) => b.depth >= 2 && b.depth <= 3).map((b) => ({
        position: b.end.clone(),
        direction: b.end.clone().sub(b.start).normalize(),
    }));
}

// ═══════════════════════════════════════════
//  ENVIRONMENT BUILDERS (VALLEY AT DAWN)
// ═══════════════════════════════════════════

function createMountains(scene: THREE.Scene) {
    const matFar = new THREE.MeshStandardMaterial({ color: '#4a5e47', roughness: 0.95 });
    const matMid = new THREE.MeshStandardMaterial({ color: '#3e4a3d', roughness: 0.92 });
    const matNear = new THREE.MeshStandardMaterial({ color: '#2b3824', roughness: 0.9 });

    const mountains = [
        // FAR LAYER (Back & Sides & FRONT)
        { x: -35, z: -40, h: 28, r: 20, mat: matFar },
        { x: 0, z: -45, h: 32, r: 25, mat: matFar },
        { x: 35, z: -38, h: 25, r: 18, mat: matFar },
        { x: -45, z: -10, h: 24, r: 18, mat: matFar },
        { x: 45, z: 0, h: 26, r: 19, mat: matFar },
        { x: -50, z: -25, h: 30, r: 22, mat: matFar },
        { x: 50, z: -25, h: 28, r: 20, mat: matFar },
        { x: -40, z: 20, h: 25, r: 18, mat: matFar },
        { x: 40, z: 20, h: 24, r: 18, mat: matFar },
        { x: -15, z: -48, h: 35, r: 24, mat: matFar },
        { x: 18, z: -46, h: 33, r: 22, mat: matFar },

        // NEW FAR MOUNTAINS TO FILL THE GAP (Front/South)
        { x: -25, z: 45, h: 26, r: 19, mat: matFar },
        { x: 0, z: 48, h: 28, r: 21, mat: matFar },
        { x: 25, z: 45, h: 25, r: 18, mat: matFar },
        { x: -45, z: 35, h: 24, r: 17, mat: matFar },
        { x: 45, z: 35, h: 27, r: 20, mat: matFar },

        // MID LAYER
        { x: -20, z: -25, h: 18, r: 14, mat: matMid },
        { x: 15, z: -28, h: 16, r: 12, mat: matMid },
        { x: 30, z: -15, h: 15, r: 10, mat: matMid },
        { x: -30, z: 5, h: 14, r: 11, mat: matMid },
        { x: -25, z: -15, h: 12, r: 9, mat: matMid },
        { x: -32, z: -30, h: 16, r: 12, mat: matMid },
        { x: 32, z: -30, h: 15, r: 11, mat: matMid },
        { x: -35, z: 12, h: 14, r: 10, mat: matMid },
        { x: 35, z: 12, h: 13, r: 9, mat: matMid },

        // NEW MID MOUNTAINS TO FILL THE GAP
        { x: -18, z: 35, h: 15, r: 11, mat: matMid },
        { x: 0, z: 38, h: 16, r: 12, mat: matMid },
        { x: 18, z: 35, h: 14, r: 10, mat: matMid },
        { x: -30, z: 28, h: 13, r: 9, mat: matMid },
        { x: 30, z: 28, h: 12, r: 9, mat: matMid },

        // NEAR LAYER
        { x: -25, z: 15, h: 10, r: 8, mat: matNear },
        { x: 28, z: 10, h: 9, r: 7, mat: matNear },
        { x: -25, z: -12, h: 8, r: 6, mat: matNear }, // Đã di chuyển xa khỏi chùa
        { x: 22, z: -12, h: 7, r: 5, mat: matNear },
        { x: -22, z: 0, h: 9, r: 7, mat: matNear },
        { x: 20, z: 0, h: 8, r: 6, mat: matNear },
        { x: -15, z: 25, h: 7, r: 5, mat: matNear },
        { x: 18, z: 25, h: 6, r: 4, mat: matNear },

        // NEW NEAR MOUNTAINS TO FILL THE GAP
        { x: -10, z: 28, h: 7, r: 5, mat: matNear },
        { x: 10, z: 28, h: 6, r: 4, mat: matNear },
    ];

    const baseColorMap = new Map([
        [matFar, new THREE.Color('#4a5e47')], // Forest green (Far)
        [matMid, new THREE.Color('#3e4a3d')], // Mid green
        [matNear, new THREE.Color('#2b3824')] // Dark green (Near)
    ]);
    const snowColor = new THREE.Color('#ffffff');

    mountains.forEach(p => {
        // Cone Geometry có nhiều segment hơn để tạo texture lồi lõm cho núi
        const geo = new THREE.ConeGeometry(p.r, p.h, 16, 12);
        const pos = geo.attributes.position;
        const rand = seededRandom(p.x * 7 + p.z * 13);
        const colors = [];
        const baseColor = baseColorMap.get(p.mat) || new THREE.Color('#4a5e47');

        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            const factor = Math.max(0, (y + p.h / 2) / p.h); // Tỉ lệ độ cao (0 đến 1)

            // Gây nhiễu mạnh hơn để tạo bề mặt ghồ ghề (texture)
            const dx = (rand() - 0.5) * p.r * 0.25 * factor;
            const dy = (rand() - 0.5) * p.h * 0.1 * factor;
            const dz = (rand() - 0.5) * p.r * 0.25 * factor;
            pos.setX(i, pos.getX(i) + dx);
            pos.setY(i, y + dy);
            pos.setZ(i, pos.getZ(i) + dz);

            // Trải texture đỉnh núi tuyết gradient mượt mà
            const vertexColor = baseColor.clone();
            if (factor > 0.55) {
                // Trên 55% độ cao sẽ bắt đầu phủ tuyết trắng
                const snowMix = Math.min(1, (factor - 0.55) / 0.45);
                vertexColor.lerp(snowColor, snowMix);
            }
            colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
        }

        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();

        // Sử dụng vertexColors: true để hiển thị gradient tuyết phủ
        const mountainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1.0, flatShading: true });
        const mesh = new THREE.Mesh(geo, mountainMat);
        mesh.position.set(p.x, p.h * 0.5 - 1.8, p.z);
        mesh.rotation.y = rand() * Math.PI * 2;
        scene.add(mesh);
    });
}

function createTemple(scene: THREE.Scene) {
    const wallMat = new THREE.MeshStandardMaterial({ color: '#c49a6c', roughness: 1.0 }); // lighter wood/plaster
    const roofMat = new THREE.MeshStandardMaterial({ color: '#4a2c1a', roughness: 0.9, flatShading: true }); // dark wood roof
    const pillarMat = new THREE.MeshStandardMaterial({ color: '#8b0000', roughness: 0.8 }); // red pillars
    const stoneMat = new THREE.MeshStandardMaterial({ color: '#5a5a5a', roughness: 0.95 }); // stone
    const goldMat = new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.3, metalness: 0.8 }); // gold for Buddha/Decor
    const altarMat = new THREE.MeshStandardMaterial({ color: '#3e2312', roughness: 0.9 }); // dark wood altar

    const temple = new THREE.Group();

    const applyNoise = (geo: THREE.BufferGeometry, intensity: number) => {
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            pos.setXYZ(
                i, 
                pos.getX(i) + (Math.random() - 0.5) * intensity,
                pos.getY(i) + (Math.random() - 0.5) * intensity,
                pos.getZ(i) + (Math.random() - 0.5) * intensity
            );
        }
        geo.computeVertexNormals();
        return geo;
    };

    // 1. Base (Nền đá lớn hơn một chút, có texture)
    const baseGeo = applyNoise(new THREE.BoxGeometry(5.0, 0.4, 3.8, 12, 2, 10), 0.06);
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.set(0, 0, 0);
    temple.add(base);

    // Bậc thềm (Steps)
    const step1Geo = applyNoise(new THREE.BoxGeometry(2.0, 0.2, 0.6, 6, 2, 3), 0.04);
    const step1 = new THREE.Mesh(step1Geo, stoneMat);
    step1.position.set(0, -0.1, 2.0);
    temple.add(step1);
    
    const step2Geo = applyNoise(new THREE.BoxGeometry(2.0, 0.2, 0.6, 6, 2, 3), 0.04);
    const step2 = new THREE.Mesh(step2Geo, stoneMat);
    step2.position.set(0, -0.3, 2.4);
    temple.add(step2);

    // 2. Walls (3 bức tường, mặt trước mở)
    // Tường sau
    const backWallGeo = applyNoise(new THREE.BoxGeometry(4.0, 2.5, 0.2, 10, 8, 2), 0.05);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 1.45, -1.3);
    temple.add(backWall);
    // Tường trái
    const leftWallGeo = applyNoise(new THREE.BoxGeometry(0.2, 2.5, 2.6, 2, 8, 8), 0.05);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-1.9, 1.45, 0);
    temple.add(leftWall);
    // Tường phải
    const rightWallGeo = applyNoise(new THREE.BoxGeometry(0.2, 2.5, 2.6, 2, 8, 8), 0.05);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(1.9, 1.45, 0);
    temple.add(rightWall);

    // 3. Nội thất (Interior)
    // Bàn thờ (Altar)
    const altarGeo = applyNoise(new THREE.BoxGeometry(2.0, 0.8, 0.8, 6, 4, 3), 0.03);
    const altar = new THREE.Mesh(altarGeo, altarMat);
    altar.position.set(0, 0.6, -0.8);
    temple.add(altar);

    // Tượng phật đơn giản (Buddha statue)
    const buddhaGroup = new THREE.Group();
    const bBaseGeo = applyNoise(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16, 2), 0.02);
    const bBase = new THREE.Mesh(bBaseGeo, goldMat);
    bBase.position.y = 0.1;
    buddhaGroup.add(bBase);
    const bBodyGeo = applyNoise(new THREE.CylinderGeometry(0.25, 0.35, 0.7, 16, 4), 0.02);
    const bBody = new THREE.Mesh(bBodyGeo, goldMat);
    bBody.position.y = 0.55;
    buddhaGroup.add(bBody);
    const bHeadGeo = applyNoise(new THREE.SphereGeometry(0.22, 16, 16), 0.015);
    const bHead = new THREE.Mesh(bHeadGeo, goldMat);
    bHead.position.y = 1.0;
    buddhaGroup.add(bHead);
    buddhaGroup.position.set(0, 1.0, -0.8);
    temple.add(buddhaGroup);

    // Hào quang (Halo)
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 8, 24), goldMat);
    halo.position.set(0, 2.0, -0.85);
    temple.add(halo);

    // Đèn cầy / Nến (Candles)
    const candleMat = new THREE.MeshBasicMaterial({ color: '#ff4400' });
    const flameMat = new THREE.MeshBasicMaterial({ color: '#ffcc00' });
    for (let i of [-1, 1]) {
        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3), candleMat);
        candle.position.set(i * 0.7, 1.15, -0.6);
        temple.add(candle);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), flameMat);
        flame.position.set(i * 0.7, 1.35, -0.6);
        temple.add(flame);

        // Point light for candles
        const light = new THREE.PointLight('#ffaa00', 0.5, 3);
        light.position.set(i * 0.7, 1.4, -0.5);
        temple.add(light);
    }

    // Lư hương (Incense Burner on altar)
    const burnerGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.1, 0.2, 8, 2), 0.01);
    const burner = new THREE.Mesh(burnerGeo, goldMat);
    burner.position.set(0, 1.1, -0.5);
    temple.add(burner);
    const incense = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3), candleMat);
    incense.position.set(0, 1.3, -0.5);
    temple.add(incense);

    // 4. Pillars (4 cột đỏ phía trước và giữa)
    for (let i of [-1, 1]) {
        // Cột trước
        const pFrontGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.15, 2.8, 8, 8), 0.02);
        const pFront = new THREE.Mesh(pFrontGeo, pillarMat);
        pFront.position.set(i * 1.8, 1.6, 1.2);
        temple.add(pFront);
        // Cột giữa
        const pMidGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.15, 2.8, 8, 8), 0.02);
        const pMid = new THREE.Mesh(pMidGeo, pillarMat);
        pMid.position.set(i * 1.8, 1.6, 0);
        temple.add(pMid);
    }

    // 5. Roof (Mái chùa cong, thêm texture)
    // Tầng mái dưới
    const roof1Geo = applyNoise(new THREE.ConeGeometry(3.6, 1.0, 16, 6), 0.08);
    const roof1 = new THREE.Mesh(roof1Geo, roofMat);
    roof1.position.y = 3.2;
    roof1.rotation.y = Math.PI / 4;
    temple.add(roof1);
    // Tầng mái trên
    const roof2Geo = applyNoise(new THREE.ConeGeometry(2.5, 1.2, 16, 6), 0.08);
    const roof2 = new THREE.Mesh(roof2Geo, roofMat);
    roof2.position.y = 4.0;
    roof2.rotation.y = Math.PI / 4;
    temple.add(roof2);

    // Thêm đèn lồng treo ở hiên
    const lanternMat = new THREE.MeshBasicMaterial({ color: '#ff2200' });
    for (let i of [-1, 1]) {
        const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), lanternMat);
        lantern.position.set(i * 1.8, 2.4, 1.2);
        lantern.scale.y = 1.2;
        temple.add(lantern);

        const lLight = new THREE.PointLight('#ff3300', 1.0, 4);
        lLight.position.set(i * 1.8, 2.2, 1.2);
        temple.add(lLight);
    }

    temple.position.set(-14, -0.6, -10);
    temple.rotation.y = 0.3;
    temple.scale.setScalar(2.0);
    scene.add(temple);
}

function createWell(scene: THREE.Scene) {
    const wellGroup = new THREE.Group();
    const stone = new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.95 });
    const darkHole = new THREE.MeshBasicMaterial({ color: '#050505' });
    const wood = new THREE.MeshStandardMaterial({ color: '#4a2c1a', roughness: 0.8 });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.65, 0.8, 12), stone);
    base.position.y = 0.4;
    wellGroup.add(base);

    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.81, 12), darkHole);
    hole.position.y = 0.4;
    wellGroup.add(hole);

    const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), wood);
    pillarL.position.set(-0.5, 1.1, 0);
    wellGroup.add(pillarL);

    const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.2, 0.1), wood);
    pillarR.position.set(0.5, 1.1, 0);
    wellGroup.add(pillarR);

    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4), wood);
    bar.rotation.z = Math.PI / 2;
    bar.position.y = 1.6;
    wellGroup.add(bar);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.6, 4), wood);
    roof.position.y = 2.4;
    roof.rotation.y = Math.PI / 4;
    wellGroup.add(roof);

    wellGroup.position.set(-10, -1, -5);
    wellGroup.scale.setScalar(1.3);
    wellGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    scene.add(wellGroup);
}

function createPond(scene: THREE.Scene) {
    const pondGroup = new THREE.Group();
    const pondRadius = 3.2;

    // Mặt nước hình tròn mượt mà
    const waterGeo = new THREE.CylinderGeometry(pondRadius, pondRadius, 0.1, 32);
    const waterMat = new THREE.MeshStandardMaterial({ 
        color: '#1a4a4a', 
        metalness: 0.98, 
        roughness: 0.02, 
        transparent: true, 
        opacity: 0.85 
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.y = -0.95;
    water.receiveShadow = true;
    pondGroup.add(water);

    // Bờ hồ: Sỏi đá cuội đan xen
    const rockMat1 = new THREE.MeshStandardMaterial({ color: '#556b55', roughness: 0.8 });
    const rockMat2 = new THREE.MeshStandardMaterial({ color: '#445544', roughness: 0.8 });
    const rockCount = 40;
    for(let i=0; i<rockCount; i++) {
        const angle = (i / rockCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.1;
        const r = pondRadius + 0.2 + (Math.random() - 0.5) * 0.3;
        const size = 0.3 + Math.random() * 0.4;
        const rockGeo = new THREE.DodecahedronGeometry(size, 1);
        const rock = new THREE.Mesh(rockGeo, Math.random() > 0.5 ? rockMat1 : rockMat2);
        rock.position.set(Math.cos(angle) * r, -0.9 - size*0.3, Math.sin(angle) * r);
        rock.rotation.set(Math.random(), Math.random(), Math.random());
        rock.scale.set(1, 0.6 + Math.random()*0.4, 1);
        rock.castShadow = true;
        rock.receiveShadow = true;
        pondGroup.add(rock);
    }

    // Thêm vài lá sen nổi trên mặt nước
    const padMat = new THREE.MeshStandardMaterial({ color: '#2d5a27', roughness: 0.9 });
    for(let i=0; i<5; i++) {
        const padRadius = 0.2 + Math.random() * 0.3;
        // Hình trụ dẹp, khuyết một góc để giống lá sen
        const padGeo = new THREE.CylinderGeometry(padRadius, padRadius, 0.02, 12, 1, false, 0, Math.PI * 1.8);
        const pad = new THREE.Mesh(padGeo, padMat);
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * (pondRadius - 0.5);
        pad.position.set(Math.cos(angle) * r, -0.89, Math.sin(angle) * r);
        pad.rotation.y = Math.random() * Math.PI * 2;
        pad.receiveShadow = true;
        pondGroup.add(pad);
    }

    pondGroup.position.set(-11, 0, 3);
    scene.add(pondGroup);
}

function createGrassAndReeds(scene: THREE.Scene) {
    // 1. REEDS (Cỏ lau) - Giảm số lượng xuống còn 120 cây để làm điểm nhấn
    const reedCount = 120;
    const stalkGeo = new THREE.CylinderGeometry(0.008, 0.02, 1.2, 3);
    stalkGeo.translate(0, 0.6, 0);
    const stalkMat = new THREE.MeshStandardMaterial({ color: '#7a8a4e', roughness: 0.85 });
    const reedStalkInst = new THREE.InstancedMesh(stalkGeo, stalkMat, reedCount);

    const plumeGeo = new THREE.SphereGeometry(0.08, 5, 5);
    const plumeMat = new THREE.MeshStandardMaterial({ color: '#f0e6c8', roughness: 0.95, transparent: true, opacity: 0.85 });
    const reedPlumeInst = new THREE.InstancedMesh(plumeGeo, plumeMat, reedCount);

    // 2. NORMAL GRASS (Cỏ thường dạng ngọn nhọn thẳng) - Tăng lên 1800 bụi để phủ nền xanh tươi tốt
    const grassCount = 1800;
    const grassGeo = new THREE.ConeGeometry(0.035, 0.35, 3);
    grassGeo.translate(0, 0.175, 0);
    const grassMat = new THREE.MeshStandardMaterial({ color: '#3f662d', roughness: 0.9 });
    const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);

    const dummy = new THREE.Object3D();
    const rand = seededRandom(888);

    // Dựng Cỏ Lau (Reeds)
    for (let i = 0; i < reedCount; i++) {
        let r = 5 + rand() * 18;
        let angle = rand() * Math.PI * 2;
        let x = Math.cos(angle) * r;
        let z = Math.sin(angle) * r;

        const distToTemple = Math.sqrt((x + 10) ** 2 + (z + 6) ** 2);
        if (distToTemple < 2.5) {
            x += (x + 10) * 0.5;
            z += (z + 6) * 0.5;
        }

        const scale = 0.6 + rand() * 0.6;
        dummy.position.set(x, -1, z);
        dummy.rotation.y = rand() * Math.PI;
        dummy.rotation.z = (rand() - 0.5) * 0.2;
        dummy.rotation.x = (rand() - 0.5) * 0.1;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        reedStalkInst.setMatrixAt(i, dummy.matrix);

        const stalkHeight = 1.2 * scale;
        dummy.position.set(
            x + Math.sin(dummy.rotation.z) * stalkHeight,
            -1 + stalkHeight,
            z - Math.sin(dummy.rotation.x) * stalkHeight
        );
        dummy.scale.set(scale, scale * 3.0, scale);
        dummy.updateMatrix();
        reedPlumeInst.setMatrixAt(i, dummy.matrix);
    }

    // Dựng Cỏ Thường (Normal Grass)
    for (let i = 0; i < grassCount; i++) {
        let r = 1.5 + rand() * 25;
        let angle = rand() * Math.PI * 2;
        let x = Math.cos(angle) * r;
        let z = Math.sin(angle) * r;

        // Tránh quá sát gốc cây chính
        if (r < 1.3) continue;

        const scale = 0.5 + rand() * 0.8;
        dummy.position.set(x, -1, z);
        dummy.rotation.y = rand() * Math.PI;
        dummy.rotation.z = (rand() - 0.5) * 0.35; // Hơi nghiêng nhẹ tự nhiên
        dummy.rotation.x = (rand() - 0.5) * 0.35;
        dummy.scale.set(scale, scale * (1 + rand() * 0.4), scale);
        dummy.updateMatrix();
        grassInst.setMatrixAt(i, dummy.matrix);
    }

    scene.add(reedStalkInst);
    scene.add(reedPlumeInst);
    scene.add(grassInst);
}

function createFlowers(scene: THREE.Scene) {
    const count = 200;
    const flowerGeo = new THREE.SphereGeometry(0.05, 4, 4);
    flowerGeo.scale(1, 0.5, 1);
    const flowerMat = new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 1.0 });
    const flowerInst = new THREE.InstancedMesh(flowerGeo, flowerMat, count);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
        dummy.position.set((Math.random() - 0.5) * 30, -0.95, (Math.random() - 0.5) * 30);
        dummy.rotation.y = Math.random() * Math.PI;
        dummy.scale.setScalar(0.5 + Math.random() * 0.5);
        dummy.updateMatrix();
        flowerInst.setMatrixAt(i, dummy.matrix);
    }
    scene.add(flowerInst);
}

function createSun(scene: THREE.Scene) {
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(4.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: '#ffcc77', fog: false })
    );
    sun.position.set(0, 22, -65);
    scene.add(sun);

    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(8.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: '#ffaa55', transparent: true, opacity: 0.18, fog: false })
    );
    halo.position.copy(sun.position);
    scene.add(halo);

    const sunLight = new THREE.DirectionalLight('#ffddaa', 2.0);
    sunLight.position.copy(sun.position);
    sunLight.target.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
    scene.add(sunLight.target);
}

function createMistLayers(scene: THREE.Scene): THREE.Mesh[] {
    const mists: THREE.Mesh[] = [];
    const configs = [
        { y: 0.3, z: -4, w: 50, h: 2.5, opacity: 0.1 },
        { y: 1.5, z: -8, w: 55, h: 3.0, opacity: 0.08 },
        { y: 2.8, z: -14, w: 60, h: 4.0, opacity: 0.05 },
    ];
    configs.forEach(c => {
        const mat = new THREE.MeshBasicMaterial({ color: FOG_COLOR, transparent: true, opacity: c.opacity, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(c.w, c.h), mat);
        mesh.position.set(0, c.y, c.z);
        mesh.rotation.x = -Math.PI * 0.04;
        mists.push(mesh); scene.add(mesh);
    });
    return mists;
}

// ─── CANVAS RENDERER ───
export function KarmaTreeCanvas({
    totalPoints,
    onAddPoint,
}: {
    totalPoints: number;
    onAddPoint: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        leafInstances: THREE.InstancedMesh | null;
        clusterGroups: THREE.Group[];
        animationId: number;
        isDragging: boolean;
        prevMouse: { x: number; y: number };
        cameraAngle: { theta: number; phi: number; radius: number };
        targetAngle: { theta: number; phi: number; radius: number };
        clock: THREE.Clock;
        branches: BranchData[];
        leafPositions: THREE.Vector3[];
        clusterPositions: { position: THREE.Vector3; direction: THREE.Vector3 }[];
        prevPoints: number;
        leafOpacities: number[];
        leafScales: number[];
        leafInitialPositions: THREE.Vector3[];
        leafInitialRotations: THREE.Euler[];
        totalPoints: number;
        mists: THREE.Mesh[];
    } | null>(null);

    const branches = useMemo(() => generateTreeBranches(), []);
    const leafPositions = useMemo(() => getLeafPositions(branches), [branches]);
    const clusterPositions = useMemo(() => getClusterPositions(branches), [branches]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(FOG_COLOR);
        scene.fog = new THREE.FogExp2(FOG_COLOR, 0.006); // Sương mù sáng sớm nhè nhẹ

        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
        camera.position.set(8, 5, 8);
        camera.lookAt(0, 3, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1; // Giảm phơi sáng để bầu trời không bị chói
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.4, 0.4, 0.85);
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        const firefliesCount = 200;
        const firefliesGeo = new THREE.BufferGeometry();
        const firefliesPos = new Float32Array(firefliesCount * 3);
        const firefliesPhase = new Float32Array(firefliesCount);
        for(let i=0; i<firefliesCount; i++) {
            firefliesPos[i*3] = (Math.random() - 0.5) * 40;
            firefliesPos[i*3+1] = Math.random() * 8;
            firefliesPos[i*3+2] = (Math.random() - 0.5) * 40;
            firefliesPhase[i] = Math.random() * Math.PI * 2;
        }
        firefliesGeo.setAttribute('position', new THREE.BufferAttribute(firefliesPos, 3));
        firefliesGeo.setAttribute('phase', new THREE.BufferAttribute(firefliesPhase, 1));
        const firefliesMat = new THREE.PointsMaterial({
            color: '#ffddaa',
            size: 0.15,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const fireflies = new THREE.Points(firefliesGeo, firefliesMat);
        scene.add(fireflies);

        const ambient = new THREE.AmbientLight(AMBIENT_COLOR, 2.0);
        scene.add(ambient);

        const pointLight1 = new THREE.PointLight("#ffddaa", 1.2, 40);
        pointLight1.position.set(5, 6, 8);
        scene.add(pointLight1);

        const groundGeo = new THREE.PlaneGeometry(100, 100, 32, 32);
        const pos = groundGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            pos.setZ(i, (Math.random() - 0.5) * 0.5);
        }
        groundGeo.computeVertexNormals();

        const groundMat = new THREE.MeshStandardMaterial({
            color: GRASS_COLOR,
            roughness: 1.0,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        scene.add(ground);

        createMountains(scene);
        createTemple(scene);
        createWell(scene);
        createPond(scene);
        createGrassAndReeds(scene);
        createSun(scene);
        createFlowers(scene);
        const mists = createMistLayers(scene);

        // Bật đổ bóng toàn cảnh
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.InstancedMesh) {
                // Không đổ bóng cho vật thể trong suốt hoặc mặt trời
                const mat = object.material as THREE.Material;
                if (mat && mat.transparent) return;
                if (object.geometry instanceof THREE.SphereGeometry && object.position.y > 20) return;
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        // Ruy băng màu đỏ nhám tĩnh lặng
        const ribbonMat = new THREE.MeshStandardMaterial({ color: "#dc2626", roughness: 1.0, metalness: 0.0, side: THREE.DoubleSide });
        const ribbons: THREE.Mesh[] = [];
        branches.filter(b => b.depth >= 2 && b.depth <= 4).forEach((b) => {
            if (Math.random() > 0.65) {
                const ribbonLength = 1.0 + Math.random() * 2.0; // ruy băng dài ngắn khác nhau từ 1.0 đến 3.0
                const ribbonGeo = new THREE.PlaneGeometry(0.12, ribbonLength);
                ribbonGeo.translate(0, -ribbonLength / 2, 0);
                const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
                ribbon.position.copy(b.end);
                ribbon.rotation.y = Math.random() * Math.PI;
                scene.add(ribbon);
                ribbons.push(ribbon);
            }
        });

        const treeMaterial = new THREE.MeshStandardMaterial({ color: TRUNK_COLOR, roughness: 1.0, metalness: 0.0 });
        const branchMaterial = new THREE.MeshStandardMaterial({ color: BRANCH_COLOR, roughness: 1.0, metalness: 0.0 });

        branches.forEach((b) => {
            const dir = b.end.clone().sub(b.start);
            const length = dir.length();
            const geo = new THREE.CylinderGeometry(b.radius * 0.6, b.radius, length, b.depth < 2 ? 8 : 5, 1);
            geo.translate(0, length / 2, 0);
            const mesh = new THREE.Mesh(geo, b.depth === 0 ? treeMaterial : branchMaterial);
            mesh.position.copy(b.start);
            const up = new THREE.Vector3(0, 1, 0);
            mesh.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(up, dir.normalize()));
            scene.add(mesh);
        });

        const roots = generateTreeRoots();
        roots.forEach((r) => {
            const dir = r.end.clone().sub(r.start);
            const length = dir.length();
            const geo = new THREE.CylinderGeometry(r.radius * 0.5, r.radius, length, 6, 1);
            geo.translate(0, length / 2, 0);
            const mesh = new THREE.Mesh(geo, treeMaterial);
            mesh.position.copy(r.start);
            const up = new THREE.Vector3(0, 1, 0);
            mesh.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(up, dir.normalize()));
            scene.add(mesh);
        });

        const maxLeaves = 20000;
        const leafGeo = new THREE.SphereGeometry(0.12, 5, 5);
        leafGeo.scale(1, 0.35, 1.25);

        const leafMat = new THREE.MeshStandardMaterial({
            roughness: 0.9,
            metalness: 0.0,
            flatShading: true,
        });

        const leafInstances = new THREE.InstancedMesh(leafGeo, leafMat, maxLeaves);

        const leafDummy = new THREE.Object3D();
        const leafRand = seededRandom(12345);
        const leafScales: number[] = [];
        const leafOpacities: number[] = [];
        const leafInitialPositions: THREE.Vector3[] = [];
        const leafInitialRotations: THREE.Euler[] = [];

        for (let i = 0; i < maxLeaves; i++) {
            const basePos = leafPositions[i % leafPositions.length];
            const offset = new THREE.Vector3(
                (leafRand() - 0.5) * 1.5,
                (leafRand() - 0.4) * 1.5,
                (leafRand() - 0.5) * 1.5
            );
            const finalPos = basePos.clone().add(offset);
            const finalRot = new THREE.Euler(
                (leafRand() - 0.5) * Math.PI,
                leafRand() * Math.PI * 2,
                (leafRand() - 0.5) * Math.PI
            );

            leafDummy.position.copy(finalPos);
            leafDummy.rotation.copy(finalRot);
            const baseScale = 0.65 + leafRand() * 0.55;
            leafDummy.scale.setScalar(baseScale);
            leafDummy.updateMatrix();
            leafInstances.setMatrixAt(i, leafDummy.matrix);

            // Tỷ lệ: 98% màu xanh lá chủ đạo, chỉ có 2% chấm điểm màu vàng tươi sáng (thiểu số)
            const isYellow = leafRand() < 0.02;
            const colorHex = isYellow
                ? YELLOW_LEAF_COLORS[Math.floor(leafRand() * YELLOW_LEAF_COLORS.length)]
                : GREEN_LEAF_COLORS[Math.floor(leafRand() * GREEN_LEAF_COLORS.length)];
            leafInstances.setColorAt(i, new THREE.Color(colorHex));

            leafScales.push(baseScale);
            leafOpacities.push(1);
            leafInitialPositions.push(finalPos);
            leafInitialRotations.push(finalRot);
        }
        leafInstances.instanceMatrix.needsUpdate = true;
        if (leafInstances.instanceColor) leafInstances.instanceColor.needsUpdate = true;
        leafInstances.count = maxLeaves;
        scene.add(leafInstances);

        const state = {
            scene, camera, renderer, composer, fireflies, leafInstances, clusterGroups: [] as THREE.Group[],
            animationId: 0, isDragging: false, prevMouse: { x: 0, y: 0 },
            cameraAngle: { theta: Math.PI / 4, phi: Math.PI / 5, radius: 14 },
            targetAngle: { theta: Math.PI / 4, phi: Math.PI / 5, radius: 14 },
            clock: new THREE.Clock(), branches, leafPositions, clusterPositions,
            prevPoints: 0, totalPoints: 0, leafOpacities, leafScales, leafInitialPositions, leafInitialRotations, mists, firefliesCount
        };
        sceneRef.current = state;

        function animate() {
            state.animationId = requestAnimationFrame(animate);
            const time = state.clock.getElapsedTime();

            state.cameraAngle.theta += (state.targetAngle.theta - state.cameraAngle.theta) * 0.05;
            state.cameraAngle.phi += (state.targetAngle.phi - state.cameraAngle.phi) * 0.05;
            state.cameraAngle.radius += (state.targetAngle.radius - state.cameraAngle.radius) * 0.05;

            const r = state.cameraAngle.radius;
            const theta = state.cameraAngle.theta;
            const phi = state.cameraAngle.phi;
            camera.position.set(r * Math.sin(theta) * Math.cos(phi), r * Math.sin(phi) + 3, r * Math.cos(theta) * Math.cos(phi));
            camera.lookAt(0, 3, 0);

            if (state.leafInstances && state.leafInstances.count > 0) {
                const dummy = new THREE.Object3D();
                // Sprouting leaf threshold: base 300 leaves + 3 leaves per point
                const activeLeaves = Math.min(2500, 300 + (state.totalPoints || 0) * 3);

                for (let i = 0; i < state.leafInstances.count; i++) {
                    const initialPos = state.leafInitialPositions[i];
                    const initialRot = state.leafInitialRotations[i];
                    if (!initialPos || !initialRot) continue;

                    dummy.position.copy(initialPos);

                    // Animate opacity/scale based on whether leaf is unlocked
                    const isUnlocked = i < activeLeaves;
                    const opacity = state.leafOpacities[i] || 0;
                    if (isUnlocked) {
                        state.leafOpacities[i] = Math.min(1.0, opacity + 0.05);
                    } else {
                        state.leafOpacities[i] = Math.max(0.0, opacity - 0.05);
                    }

                    const baseScale = state.leafScales[i] || 1.0;
                    dummy.scale.setScalar(baseScale * state.leafOpacities[i]);

                    dummy.rotation.copy(initialRot);

                    dummy.updateMatrix();
                    state.leafInstances.setMatrixAt(i, dummy.matrix);
                }
                state.leafInstances.instanceMatrix.needsUpdate = true;
            }

            state.clusterGroups.forEach((group, gi) => {
                group.children.forEach((child, ci) => {
                    // Xóa hiệu ứng gió đung đưa
                });
            });

            // Xóa hiệu ứng đung đưa của ruy băng

            state.mists.forEach((m, i) => {
                m.position.x = Math.sin(time * 0.08 + i * 2.5) * 6;
                (m.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(time * 0.15 + i * 1.3) * 0.015;
            });

            // Fireflies animation
            const fPos = state.fireflies.geometry.attributes.position.array as Float32Array;
            const fPhase = state.fireflies.geometry.attributes.phase.array as Float32Array;
            for(let i=0; i<state.firefliesCount; i++) {
                fPos[i*3] += Math.cos(time * 0.5 + fPhase[i]) * 0.01;
                fPos[i*3+1] += Math.sin(time * 0.3 + fPhase[i]) * 0.01;
            }
            state.fireflies.geometry.attributes.position.needsUpdate = true;

            state.composer.render();
        }
        animate();

        const onMouseDown = (e: MouseEvent) => { state.isDragging = true; state.prevMouse = { x: e.clientX, y: e.clientY }; };
        const onMouseMove = (e: MouseEvent) => {
            if (!state.isDragging) return;
            state.targetAngle.theta -= (e.clientX - state.prevMouse.x) * 0.005;
            state.targetAngle.phi = Math.max(0.05, Math.min(Math.PI / 2.2, state.targetAngle.phi + (e.clientY - state.prevMouse.y) * 0.005));
            state.prevMouse = { x: e.clientX, y: e.clientY };
        };
        const onMouseUp = () => { state.isDragging = false; };
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            state.targetAngle.radius = Math.max(6, Math.min(25, state.targetAngle.radius + e.deltaY * 0.01));
        };

        const canvas = renderer.domElement;
        canvas.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("wheel", onWheel, { passive: false });

        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            state.composer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(state.animationId);
            canvas.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("wheel", onWheel);
            window.removeEventListener("resize", onResize);

            scene.traverse((object) => {
                const renderable = object as THREE.Mesh | THREE.Points | THREE.Line;
                if ((object as any).isMesh || (object as any).isPoints || (object as any).isLine) {
                    if (renderable.geometry) renderable.geometry.dispose();
                    if (renderable.material) {
                        if (Array.isArray(renderable.material)) renderable.material.forEach(m => m.dispose());
                        else renderable.material.dispose();
                    }
                }
            });

            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, [branches, leafPositions, clusterPositions]);

    useEffect(() => {
        const state = sceneRef.current;
        if (!state) return;

        const maxClusters = state.clusterPositions.length;
        const totalClusters = Math.min(Math.floor(totalPoints / CLUSTER_THRESHOLD), maxClusters);
        state.totalPoints = totalPoints;

        state.clusterGroups.forEach((g) => {
            g.children.forEach((child) => {
                const renderable = child as THREE.Mesh | THREE.Points | THREE.Line | THREE.InstancedMesh;
                if (renderable.geometry) renderable.geometry.dispose();
                if (renderable.material) {
                    if (Array.isArray(renderable.material)) renderable.material.forEach(m => m.dispose());
                    else renderable.material.dispose();
                }
            });
            state.scene.remove(g);
        });
        state.clusterGroups = [];

        const fruitGeo = new THREE.SphereGeometry(0.06, 6, 6);
        fruitGeo.scale(1, 1.5, 1);
        // Đổi base color thành trắng (#ffffff) để màu set từ CLUSTER_COLORS (xanh/vàng) không bị sai màu thành cam/nâu
        const fruitMat = new THREE.MeshStandardMaterial({
            color: "#ffffff",
            roughness: 1.0,
            metalness: 0.0,
            flatShading: true
        });

        for (let c = 0; c < totalClusters; c++) {
            const clusterPos = state.clusterPositions[c % state.clusterPositions.length];
            const group = new THREE.Group();
            group.position.copy(clusterPos.position);

            const clusterRand = seededRandom(c * 137 + 42);
            const numStrands = 4 + Math.floor(clusterRand() * 3);
            let totalBeadsInCluster = 0;
            const strandsData = [];

            for (let s = 0; s < numStrands; s++) {
                const numBeads = 6 + Math.floor(clusterRand() * 6);
                totalBeadsInCluster += numBeads;
                strandsData.push({
                    length: 1.5 + clusterRand() * 2.5,
                    numBeads: numBeads,
                    offsetX: (clusterRand() - 0.5) * 0.8,
                    offsetZ: (clusterRand() - 0.5) * 0.8,
                    sIndex: s
                });
            }

            const fruitInst = new THREE.InstancedMesh(fruitGeo, fruitMat, totalBeadsInCluster);
            let beadIndex = 0;
            const fruitDummy = new THREE.Object3D();

            strandsData.forEach(strand => {
                for (let b = 0; b < strand.numBeads; b++) {
                    const t = b / (strand.numBeads - 1);
                    const waveX = Math.sin(t * Math.PI * 2 + strand.sIndex) * 0.08;
                    const waveZ = Math.cos(t * Math.PI * 1.5 + strand.sIndex * 0.7) * 0.06;

                    fruitDummy.position.set(
                        strand.offsetX + waveX,
                        -t * strand.length,
                        strand.offsetZ + waveZ
                    );

                    const scale = 0.5 + clusterRand() * 0.8;
                    fruitDummy.scale.setScalar(scale);
                    fruitDummy.rotation.set(clusterRand(), clusterRand(), clusterRand());
                    fruitDummy.updateMatrix();

                    fruitInst.setMatrixAt(beadIndex, fruitDummy.matrix);

                    const col = new THREE.Color(CLUSTER_COLORS[b % CLUSTER_COLORS.length]);
                    fruitInst.setColorAt(beadIndex, col.multiplyScalar(0.7 + (1 - t) * 0.3));
                    beadIndex++;
                }
            });

            group.add(fruitInst);
            state.scene.add(group);
            state.clusterGroups.push(group);
        }
        state.prevPoints = totalPoints;

    }, [totalPoints, leafPositions, clusterPositions]);

    return (
        <div ref={containerRef} onClick={onAddPoint} style={{ width: "100%", height: "100%", cursor: "grab", position: "absolute", inset: 0 }} />
    );
}

// ─── MAIN COMPONENT ───
export default function KarmaTree() {
    const [totalPoints, setTotalPoints] = useState(0);

    const currentLeaves = totalPoints % CLUSTER_THRESHOLD;
    const totalClusters = Math.floor(totalPoints / CLUSTER_THRESHOLD);

    const addPoint = useCallback(() => setTotalPoints((p) => p + 1), []);
    const addMany = useCallback((n: number) => setTotalPoints((p) => p + n), []);

    return (
        <div style={{ width: "100%", height: "100vh", background: FOG_COLOR, position: "relative", overflow: "hidden", fontFamily: "'Noto Serif', Georgia, serif" }}>
            <KarmaTreeCanvas totalPoints={totalPoints} onAddPoint={addPoint} />

            <div
                style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    padding: "20px 24px",
                    background: "linear-gradient(180deg, rgba(20,30,20,0.85) 0%, transparent 100%)",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    pointerEvents: "none", zIndex: 10,
                }}
            >
                <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#4ADE80", textTransform: "uppercase", marginBottom: 4 }}>Karma Tree</div>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700, color: "#F0E6C8", letterSpacing: "0.08em" }}>
                        Cây <span style={{ color: "#FACC15" }}>Công Đức</span>
                    </div>
                </div>

                <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Cinzel', serif", fontSize: 36, fontWeight: 700, color: "#FACC15", lineHeight: 1, textShadow: "0 0 30px rgba(250,204,21,0.5)" }}>
                        {totalPoints}
                    </div>
                    <div style={{ fontSize: 9, color: "#4ADE80", letterSpacing: "0.2em" }}>TỔNG CÔNG ĐỨC</div>
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "24px",
                    background: "linear-gradient(0deg, rgba(20,30,20,0.9) 0%, transparent 100%)",
                    zIndex: 10,
                }}
            >
                <div style={{ maxWidth: 400, margin: "0 auto 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#86EFAC", marginBottom: 4, letterSpacing: "0.15em" }}>
                        <span>🍃 {currentLeaves} / {CLUSTER_THRESHOLD} LÁ</span>
                        <span>✨ {totalClusters} CHÙM LÁ</span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(currentLeaves / CLUSTER_THRESHOLD) * 100}%`, background: "linear-gradient(90deg, #166534, #4ADE80, #FACC15)", borderRadius: 2, transition: "width 0.5s ease" }} />
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={addPoint} style={btnStyle("#166534", "#4ADE80")}>🪷 +1 Đức</button>
                    <button onClick={() => addMany(10)} style={btnStyle("#A16207", "#FACC15")}>✨ +10</button>
                    <button onClick={() => addMany(50)} style={btnStyle("#D97706", "#FDE047")}>🌟 +50 (1 Chùm)</button>
                    <button onClick={() => setTotalPoints(0)} style={{ ...btnStyle("#333", "#888"), fontSize: 11, padding: "8px 14px" }}>Reset</button>
                </div>

                <div style={{ textAlign: "center", fontSize: 10, color: "rgba(240,230,200,0.4)", marginTop: 12, fontStyle: "italic" }}>
                    Kéo để xoay · Scroll để zoom · Click vào cây để +1
                </div>
            </div>
        </div>
    );
}

function btnStyle(borderColor: string, textColor: string): React.CSSProperties {
    return {
        padding: "10px 20px", borderRadius: 6, border: `1px solid ${borderColor}`,
        background: `linear-gradient(135deg, ${borderColor}22, ${borderColor}08)`, color: textColor,
        fontFamily: "'Noto Serif', serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em",
        cursor: "pointer", transition: "all 0.25s",
    };
}