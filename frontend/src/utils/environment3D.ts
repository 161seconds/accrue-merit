import * as THREE from 'three';

// ─── CONSTANTS ───
export const FOG_COLOR = "#d0ccc0";
export const AMBIENT_COLOR = "#a6a096";
export const GRASS_COLOR = "#3b5e2b";

// ─── SEEDED RANDOM ───
export function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 213647;
        return (s - 1) / 213647;
    };
}

// ═══════════════════════════════════════════
//  ENVIRONMENT BUILDERS (VALLEY AT DAWN)
// ═══════════════════════════════════════════

export function createMountains(scene: THREE.Scene) {
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
        const geo = new THREE.ConeGeometry(p.r, p.h, 16, 12);
        const pos = geo.attributes.position;
        const rand = seededRandom(p.x * 7 + p.z * 13);
        const colors = [];
        const baseColor = baseColorMap.get(p.mat) || new THREE.Color('#4a5e47');

        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            const factor = Math.max(0, (y + p.h / 2) / p.h);

            const dx = (rand() - 0.5) * p.r * 0.25 * factor;
            const dy = (rand() - 0.5) * p.h * 0.1 * factor;
            const dz = (rand() - 0.5) * p.r * 0.25 * factor;
            pos.setX(i, pos.getX(i) + dx);
            pos.setY(i, y + dy);
            pos.setZ(i, pos.getZ(i) + dz);

            const vertexColor = baseColor.clone();
            if (factor > 0.55) {
                const snowMix = Math.min(1, (factor - 0.55) / 0.45);
                vertexColor.lerp(snowColor, snowMix);
            }
            colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
        }

        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();

        const mountainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1.0, flatShading: true });
        const mesh = new THREE.Mesh(geo, mountainMat);
        mesh.position.set(p.x, p.h * 0.5 - 1.8, p.z);
        mesh.rotation.y = rand() * Math.PI * 2;
        scene.add(mesh);
    });
}

export function createTemple(scene: THREE.Scene) {
    const wallMat = new THREE.MeshStandardMaterial({ color: '#c49a6c', roughness: 1.0 }); 
    const roofMat = new THREE.MeshStandardMaterial({ color: '#4a2c1a', roughness: 0.9, flatShading: true }); 
    const pillarMat = new THREE.MeshStandardMaterial({ color: '#8b0000', roughness: 0.8 }); 
    const stoneMat = new THREE.MeshStandardMaterial({ color: '#5a5a5a', roughness: 0.95 }); 
    const goldMat = new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.3, metalness: 0.8 }); 
    const altarMat = new THREE.MeshStandardMaterial({ color: '#3e2312', roughness: 0.9 }); 

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

    const baseGeo = applyNoise(new THREE.BoxGeometry(5.0, 0.4, 3.8, 12, 2, 10), 0.06);
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.set(0, 0, 0);
    temple.add(base);

    const step1Geo = applyNoise(new THREE.BoxGeometry(2.0, 0.2, 0.6, 6, 2, 3), 0.04);
    const step1 = new THREE.Mesh(step1Geo, stoneMat);
    step1.position.set(0, -0.1, 2.0);
    temple.add(step1);
    
    const step2Geo = applyNoise(new THREE.BoxGeometry(2.0, 0.2, 0.6, 6, 2, 3), 0.04);
    const step2 = new THREE.Mesh(step2Geo, stoneMat);
    step2.position.set(0, -0.3, 2.4);
    temple.add(step2);

    const backWallGeo = applyNoise(new THREE.BoxGeometry(4.0, 2.5, 0.2, 10, 8, 2), 0.05);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 1.45, -1.3);
    temple.add(backWall);
    
    const leftWallGeo = applyNoise(new THREE.BoxGeometry(0.2, 2.5, 2.6, 2, 8, 8), 0.05);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-1.9, 1.45, 0);
    temple.add(leftWall);
    
    const rightWallGeo = applyNoise(new THREE.BoxGeometry(0.2, 2.5, 2.6, 2, 8, 8), 0.05);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(1.9, 1.45, 0);
    temple.add(rightWall);

    const altarGeo = applyNoise(new THREE.BoxGeometry(2.0, 0.8, 0.8, 6, 4, 3), 0.03);
    const altar = new THREE.Mesh(altarGeo, altarMat);
    altar.position.set(0, 0.6, -0.8);
    temple.add(altar);

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

    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 8, 24), goldMat);
    halo.position.set(0, 2.0, -0.85);
    temple.add(halo);

    const candleMat = new THREE.MeshBasicMaterial({ color: '#ff4400' });
    const flameMat = new THREE.MeshBasicMaterial({ color: '#ffcc00' });
    for (let i of [-1, 1]) {
        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3), candleMat);
        candle.position.set(i * 0.7, 1.15, -0.6);
        temple.add(candle);

        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), flameMat);
        flame.position.set(i * 0.7, 1.35, -0.6);
        temple.add(flame);

        const light = new THREE.PointLight('#ffaa00', 0.5, 3);
        light.position.set(i * 0.7, 1.4, -0.5);
        temple.add(light);
    }

    const burnerGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.1, 0.2, 8, 2), 0.01);
    const burner = new THREE.Mesh(burnerGeo, goldMat);
    burner.position.set(0, 1.1, -0.5);
    temple.add(burner);
    const incense = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3), candleMat);
    incense.position.set(0, 1.3, -0.5);
    temple.add(incense);

    for (let i of [-1, 1]) {
        const pFrontGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.15, 2.8, 8, 8), 0.02);
        const pFront = new THREE.Mesh(pFrontGeo, pillarMat);
        pFront.position.set(i * 1.8, 1.6, 1.2);
        temple.add(pFront);
        
        const pMidGeo = applyNoise(new THREE.CylinderGeometry(0.12, 0.15, 2.8, 8, 8), 0.02);
        const pMid = new THREE.Mesh(pMidGeo, pillarMat);
        pMid.position.set(i * 1.8, 1.6, 0);
        temple.add(pMid);
    }

    const roof1Geo = applyNoise(new THREE.ConeGeometry(3.6, 1.0, 16, 6), 0.08);
    const roof1 = new THREE.Mesh(roof1Geo, roofMat);
    roof1.position.y = 3.2;
    roof1.rotation.y = Math.PI / 4;
    temple.add(roof1);
    
    const roof2Geo = applyNoise(new THREE.ConeGeometry(2.5, 1.2, 16, 6), 0.08);
    const roof2 = new THREE.Mesh(roof2Geo, roofMat);
    roof2.position.y = 4.0;
    roof2.rotation.y = Math.PI / 4;
    temple.add(roof2);

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

export function createWell(scene: THREE.Scene) {
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

export function createPond(scene: THREE.Scene) {
    const pondGroup = new THREE.Group();
    const pondRadius = 3.2;

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

    const padMat = new THREE.MeshStandardMaterial({ color: '#2d5a27', roughness: 0.9 });
    for(let i=0; i<5; i++) {
        const padRadius = 0.2 + Math.random() * 0.3;
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

export function createGrassAndReeds(scene: THREE.Scene) {
    const reedCount = 120;
    const stalkGeo = new THREE.CylinderGeometry(0.008, 0.02, 1.2, 3);
    stalkGeo.translate(0, 0.6, 0);
    const stalkMat = new THREE.MeshStandardMaterial({ color: '#7a8a4e', roughness: 0.85 });
    const reedStalkInst = new THREE.InstancedMesh(stalkGeo, stalkMat, reedCount);

    const plumeGeo = new THREE.SphereGeometry(0.08, 5, 5);
    const plumeMat = new THREE.MeshStandardMaterial({ color: '#f0e6c8', roughness: 0.95, transparent: true, opacity: 0.85 });
    const reedPlumeInst = new THREE.InstancedMesh(plumeGeo, plumeMat, reedCount);

    const grassCount = 1800;
    const grassGeo = new THREE.ConeGeometry(0.035, 0.35, 3);
    grassGeo.translate(0, 0.175, 0);
    const grassMat = new THREE.MeshStandardMaterial({ color: '#3f662d', roughness: 0.9 });
    const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);

    const dummy = new THREE.Object3D();
    const rand = seededRandom(888);

    const reedBaseRotations = [];
    const grassBaseRotations = [];
    const reedScales = [];
    const grassScales = [];

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

        reedBaseRotations.push(new THREE.Euler(dummy.rotation.x, dummy.rotation.y, dummy.rotation.z));
        reedScales.push(scale);

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

    for (let i = 0; i < grassCount; i++) {
        let r = 1.5 + rand() * 25;
        let angle = rand() * Math.PI * 2;
        let x = Math.cos(angle) * r;
        let z = Math.sin(angle) * r;

        if (r < 1.3) {
            grassBaseRotations.push(new THREE.Euler());
            grassScales.push(1);
            continue; // Will leave a 0 scale matrix or skip
        }

        const scale = 0.5 + rand() * 0.8;
        dummy.position.set(x, -1, z);
        dummy.rotation.y = rand() * Math.PI;
        dummy.rotation.z = (rand() - 0.5) * 0.35; 
        dummy.rotation.x = (rand() - 0.5) * 0.35;
        dummy.scale.set(scale, scale * (1 + rand() * 0.4), scale);
        dummy.updateMatrix();
        grassInst.setMatrixAt(i, dummy.matrix);
        
        grassBaseRotations.push(new THREE.Euler(dummy.rotation.x, dummy.rotation.y, dummy.rotation.z));
        grassScales.push(scale);
    }

    scene.add(reedStalkInst);
    scene.add(reedPlumeInst);
    scene.add(grassInst);
    
    return { 
        reedStalkInst, reedPlumeInst, grassInst, 
        reedCount, grassCount,
        reedBaseRotations, grassBaseRotations,
        reedScales, grassScales
    };
}

export function createFlowers(scene: THREE.Scene) {
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

export function createSun(scene: THREE.Scene) {
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

export function createMistLayers(scene: THREE.Scene): THREE.Mesh[] {
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
