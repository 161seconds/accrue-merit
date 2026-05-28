import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";
import { Sparkles, Star, Leaf } from 'lucide-react';
import { 
    FOG_COLOR, AMBIENT_COLOR, GRASS_COLOR, seededRandom,
    createMountains, createTemple, createWell, createPond, 
    createGrassAndReeds, createFlowers, createSun, createMistLayers 
} from '@/utils/environment3D';
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { LotusIcon } from '@/components/ui/Icons';
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
        grassAndReeds?: any;
        fallingLeavesInst?: THREE.InstancedMesh;
        fallingLeavesData?: any[];
        treeMaterial?: THREE.MeshStandardMaterial;
        flashIntensity?: number;
        firefliesCount?: number;
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
        const grassAndReeds = createGrassAndReeds(scene);
        createSun(scene);
        createFlowers(scene);
        const mists = createMistLayers(scene);

        // --- FALLING LEAVES ---
        const fallingLeavesCount = 50;
        const fallingLeafGeo = new THREE.SphereGeometry(0.1, 4, 4);
        fallingLeafGeo.scale(1, 0.3, 1.2);
        const fallingLeafMat = new THREE.MeshStandardMaterial({ color: '#FFB300', roughness: 0.9, flatShading: true, side: THREE.DoubleSide });
        const fallingLeavesInst = new THREE.InstancedMesh(fallingLeafGeo, fallingLeafMat, fallingLeavesCount);
        
        const fallingLeavesData: any[] = [];
        for(let i=0; i<fallingLeavesCount; i++) {
            fallingLeavesData.push({
                x: (Math.random() - 0.5) * 20,
                y: 5 + Math.random() * 10,
                z: (Math.random() - 0.5) * 20,
                speedY: 0.015 + Math.random() * 0.02,
                speedX: (Math.random() - 0.5) * 0.01,
                speedZ: (Math.random() - 0.5) * 0.01,
                rotX: Math.random() * Math.PI,
                rotY: Math.random() * Math.PI,
                rotZ: Math.random() * Math.PI
            });
        }
        scene.add(fallingLeavesInst);


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

        const treeMaterial = new THREE.MeshStandardMaterial({ 
            color: TRUNK_COLOR, 
            roughness: 1.0, 
            metalness: 0.0,
            emissive: new THREE.Color('#FFB300'),
            emissiveIntensity: 0
        });
        const branchMaterial = new THREE.MeshStandardMaterial({ color: BRANCH_COLOR, roughness: 1.0, metalness: 0.0 });

        const trunkGeometries: THREE.CylinderGeometry[] = [];
        const branchGeometries: THREE.CylinderGeometry[] = [];
        const rootGeometries: THREE.CylinderGeometry[] = [];

        branches.forEach((b) => {
            const dir = b.end.clone().sub(b.start);
            const length = dir.length();
            const geo = new THREE.CylinderGeometry(b.radius * 0.6, b.radius, length, b.depth < 2 ? 8 : 5, 1);
            geo.translate(0, length / 2, 0);
            
            const matrix = new THREE.Matrix4();
            const up = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir.normalize());
            matrix.compose(b.start, quaternion, new THREE.Vector3(1, 1, 1));
            geo.applyMatrix4(matrix);
            
            if (b.depth === 0) {
                trunkGeometries.push(geo);
            } else {
                branchGeometries.push(geo);
            }
        });

        const roots = generateTreeRoots();
        roots.forEach((r) => {
            const dir = r.end.clone().sub(r.start);
            const length = dir.length();
            const geo = new THREE.CylinderGeometry(r.radius * 0.5, r.radius, length, 6, 1);
            geo.translate(0, length / 2, 0);
            
            const matrix = new THREE.Matrix4();
            const up = new THREE.Vector3(0, 1, 0);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir.normalize());
            matrix.compose(r.start, quaternion, new THREE.Vector3(1, 1, 1));
            geo.applyMatrix4(matrix);
            
            rootGeometries.push(geo);
        });

        if (trunkGeometries.length > 0 || rootGeometries.length > 0) {
            const mergedTrunk = BufferGeometryUtils.mergeGeometries([...trunkGeometries, ...rootGeometries]);
            const trunkMesh = new THREE.Mesh(mergedTrunk, treeMaterial);
            trunkMesh.castShadow = true;
            trunkMesh.receiveShadow = true;
            scene.add(trunkMesh);
        }

        if (branchGeometries.length > 0) {
            const mergedBranch = BufferGeometryUtils.mergeGeometries(branchGeometries);
            const branchMesh = new THREE.Mesh(mergedBranch, branchMaterial);
            branchMesh.castShadow = true;
            branchMesh.receiveShadow = true;
            scene.add(branchMesh);
        }

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
            prevPoints: 0, totalPoints: 0, leafOpacities, leafScales, leafInitialPositions, leafInitialRotations, mists, firefliesCount,
            grassAndReeds, fallingLeavesInst, fallingLeavesData, treeMaterial, flashIntensity: 0
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

            // Wind simulation (grass & reeds)
            const wind = Math.sin(time * 1.2) * 0.15;
            const dummy = new THREE.Object3D();
            
            if (state.grassAndReeds) {
                const { reedStalkInst, reedPlumeInst, grassInst, reedCount, grassCount, reedBaseRotations, grassBaseRotations, reedScales, grassScales } = state.grassAndReeds;
                
                // Reeds
                for (let i = 0; i < reedCount; i++) {
                    const baseRot = reedBaseRotations[i];
                    const scale = reedScales[i];
                    
                    reedStalkInst.getMatrixAt(i, dummy.matrix);
                    dummy.position.setFromMatrixPosition(dummy.matrix);
                    dummy.rotation.set(baseRot.x + wind * 0.5, baseRot.y, baseRot.z + wind);
                    dummy.scale.setScalar(scale);
                    dummy.updateMatrix();
                    reedStalkInst.setMatrixAt(i, dummy.matrix);
                    
                    const stalkHeight = 1.2 * scale;
                    dummy.position.set(
                        dummy.position.x + Math.sin(dummy.rotation.z) * stalkHeight,
                        dummy.position.y + stalkHeight,
                        dummy.position.z - Math.sin(dummy.rotation.x) * stalkHeight
                    );
                    dummy.scale.set(scale, scale * 3.0, scale);
                    dummy.updateMatrix();
                    reedPlumeInst.setMatrixAt(i, dummy.matrix);
                }
                reedStalkInst.instanceMatrix.needsUpdate = true;
                if(reedPlumeInst) reedPlumeInst.instanceMatrix.needsUpdate = true;

                // Grass
                for (let i = 0; i < grassCount; i++) {
                    const baseRot = grassBaseRotations[i];
                    if (!baseRot) continue;
                    const scale = grassScales[i];
                    
                    grassInst.getMatrixAt(i, dummy.matrix);
                    dummy.position.setFromMatrixPosition(dummy.matrix);
                    dummy.rotation.set(baseRot.x + wind * 0.8, baseRot.y, baseRot.z + wind * 1.2);
                    dummy.scale.set(scale, scale * 1.2, scale);
                    dummy.updateMatrix();
                    grassInst.setMatrixAt(i, dummy.matrix);
                }
                grassInst.instanceMatrix.needsUpdate = true;
            }

            // Falling Leaves
            if (state.fallingLeavesInst && state.fallingLeavesData) {
                for(let i=0; i<state.fallingLeavesInst.count; i++) {
                    const data = state.fallingLeavesData[i];
                    data.y -= data.speedY;
                    data.x += data.speedX + Math.sin(time + i) * 0.01;
                    data.z += data.speedZ + Math.cos(time + i) * 0.01;
                    data.rotX += 0.02;
                    data.rotY += 0.03;
                    
                    if (data.y < -0.9) {
                        data.y = 8 + Math.random() * 5;
                        data.x = (Math.random() - 0.5) * 15;
                        data.z = (Math.random() - 0.5) * 15;
                    }
                    
                    dummy.position.set(data.x, data.y, data.z);
                    dummy.rotation.set(data.rotX, data.rotY, data.rotZ);
                    dummy.scale.setScalar(1);
                    dummy.updateMatrix();
                    state.fallingLeavesInst.setMatrixAt(i, dummy.matrix);
                }
                state.fallingLeavesInst.instanceMatrix.needsUpdate = true;
            }

            // Interaction Flash on Tree
            if (state.flashIntensity !== undefined && state.flashIntensity > 0) {
                state.flashIntensity -= 0.05; // fade out
                if (state.flashIntensity < 0) state.flashIntensity = 0;
            }
            if (state.treeMaterial && state.flashIntensity !== undefined) {
                state.treeMaterial.emissiveIntensity = state.flashIntensity;
            }

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
        if (totalPoints > state.prevPoints) {
            if (state) state.flashIntensity = 0.8; // Trigger flash
        }
        if (state) state.prevPoints = totalPoints;

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
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Leaf size={12} /> {currentLeaves} / {CLUSTER_THRESHOLD} LÁ</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Sparkles size={12} /> {totalClusters} CHÙM LÁ</span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(currentLeaves / CLUSTER_THRESHOLD) * 100}%`, background: "linear-gradient(90deg, #166534, #4ADE80, #FACC15)", borderRadius: 2, transition: "width 0.5s ease" }} />
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={addPoint} style={btnStyle("#166534", "#4ADE80")}><LotusIcon style={{ width: 14, height: 14 }} /> +1 Đức</button>
                    <button onClick={() => addMany(10)} style={btnStyle("#A16207", "#FACC15")}><Sparkles size={14} /> +10</button>
                    <button onClick={() => addMany(50)} style={btnStyle("#D97706", "#FDE047")}><Star size={14} /> +50 (1 Chùm)</button>
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
        display: "flex", alignItems: "center", gap: "6px", justifyContent: "center"
    };
}