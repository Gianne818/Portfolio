import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ISLAND_PORTALS, PortalId } from '../../data/portfolioData';
import { ThemeMode } from '../hud/TopNavHud';
import { ChevronRightIcon, FeatherIcon } from '../icons/BotanicalIcons';

interface AvianSanctuary3DProps {
  theme: ThemeMode;
  activePortal: PortalId | null;
  autoPilotTarget: PortalId | null;
  onArriveAtPortal: (portalId: PortalId) => void;
  onTriggerAutoPilot: (portalId: PortalId) => void;
}

export const AvianSanctuary3D: React.FC<AvianSanctuary3DProps> = ({
  theme,
  activePortal,
  autoPilotTarget,
  onArriveAtPortal,
  onTriggerAutoPilot,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pinRefs = useRef<Record<PortalId, HTMLButtonElement | null>>({
    bio: null,
    skills: null,
    projects: null,
    dispatch: null,
  });

  const [isPropelling, setIsPropelling] = useState(false);

  const themeRef = useRef<ThemeMode>(theme);
  themeRef.current = theme;

  const activePortalRef = useRef<PortalId | null>(activePortal);
  activePortalRef.current = activePortal;

  const autoPilotRef = useRef<PortalId | null>(autoPilotTarget);
  autoPilotRef.current = autoPilotTarget;

  const onArriveRef = useRef(onArriveAtPortal);
  onArriveRef.current = onArriveAtPortal;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Fog & Camera
    const scene = new THREE.Scene();
    const initialBg = themeRef.current === 'dark' ? 0x0b130e : 0xf4efe6;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.FogExp2(initialBg, 0.0085);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.5,
      320
    );
    camera.position.set(0, 14, 34);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Synchronized with Day/Night Theme)
    const hemiLight = new THREE.HemisphereLight(0xfff8eb, 0x2d4a34, 1.35);
    hemiLight.position.set(0, 60, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffdfab, 1.6);
    dirLight.position.set(45, 72, 35);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 180;
    const d = 75;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // 3. Calm Reflecting Sanctuary Mirror Sea / Cloud Floor
    const waterGeo = new THREE.PlaneGeometry(500, 500, 36, 36);
    const waterMat = new THREE.MeshStandardMaterial({
      color: themeRef.current === 'dark' ? 0x0f1c14 : 0xdce5d8,
      roughness: 0.35,
      metalness: 0.1,
      flatShading: true,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -6;
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);

    const posAttr = waterGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const zOffset = Math.sin(x * 0.06) * Math.cos(y * 0.06) * 0.9;
      posAttr.setZ(i, zOffset);
    }
    waterGeo.computeVertexNormals();

    // 4. Build the 4 Floating Botanical Sanctuary Islands & Landmarks
    const portalRings: {
      id: PortalId;
      ring: THREE.Mesh;
      beacon?: THREE.Object3D;
      pos: THREE.Vector3;
    }[] = [];

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x5c5346,
      roughness: 0.85,
      flatShading: true,
    });
    const mossMat = new THREE.MeshStandardMaterial({
      color: 0x3b6245,
      roughness: 0.65,
      flatShading: true,
    });
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xe6dec8,
      roughness: 0.5,
      flatShading: true,
    });
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc9944c,
      roughness: 0.3,
      metalness: 0.65,
    });

    ISLAND_PORTALS.forEach((portal) => {
      const [px, py, pz] = portal.coordinates;
      const islandGroup = new THREE.Group();
      islandGroup.position.set(px, py, pz);

      const baseGeo = new THREE.ConeGeometry(9.5, 11, 9);
      const baseMesh = new THREE.Mesh(baseGeo, rockMat);
      baseMesh.rotation.x = Math.PI;
      baseMesh.position.y = -5.2;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      islandGroup.add(baseMesh);

      const capGeo = new THREE.CylinderGeometry(9.8, 9.2, 2.2, 10);
      const capMesh = new THREE.Mesh(capGeo, mossMat);
      capMesh.position.y = 0.2;
      capMesh.receiveShadow = true;
      islandGroup.add(capMesh);

      const ringGeo = new THREE.TorusGeometry(4.6, 0.18, 12, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: portal.accentHex,
        emissive: portal.accentHex,
        emissiveIntensity: 0.85,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(0, 6.2, 5.5);
      islandGroup.add(ringMesh);

      let rotatingBeacon: THREE.Object3D | undefined;

      if (portal.id === 'bio') {
        const trunkMat = new THREE.MeshStandardMaterial({
          color: 0x594233,
          roughness: 0.8,
          flatShading: true,
        });
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(1.1, 1.9, 6.5, 7),
          trunkMat
        );
        trunk.position.y = 3.5;
        trunk.castShadow = true;
        islandGroup.add(trunk);

        const canopyColors = [0x2d4a34, 0x3b6245, 0x4d7c59];
        const offsets = [
          [0, 8.2, 0, 4.8],
          [-2.8, 6.8, 1.5, 3.4],
          [2.9, 7.1, -1.2, 3.6],
          [0, 6.5, -2.5, 3.2],
        ];
        offsets.forEach(([ox, oy, oz, rad], idx) => {
          const foliage = new THREE.Mesh(
            new THREE.IcosahedronGeometry(rad, 1),
            new THREE.MeshStandardMaterial({
              color: canopyColors[idx % canopyColors.length],
              roughness: 0.6,
              flatShading: true,
            })
          );
          foliage.position.set(ox, oy, oz);
          foliage.castShadow = true;
          islandGroup.add(foliage);
        });
      } else if (portal.id === 'skills') {
        const pedestal = new THREE.Mesh(
          new THREE.CylinderGeometry(3.2, 3.8, 3.2, 8),
          stoneMat
        );
        pedestal.position.y = 2.4;
        islandGroup.add(pedestal);

        const armillaryGroup = new THREE.Group();
        armillaryGroup.position.y = 7.4;
        const r1 = new THREE.Mesh(
          new THREE.TorusGeometry(3.2, 0.16, 10, 32),
          bronzeMat
        );
        const r2 = new THREE.Mesh(
          new THREE.TorusGeometry(2.5, 0.14, 10, 32),
          bronzeMat
        );
        r2.rotation.x = Math.PI / 3;
        const core = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.1, 0),
          bronzeMat
        );
        armillaryGroup.add(r1, r2, core);
        islandGroup.add(armillaryGroup);
        rotatingBeacon = armillaryGroup;
      } else if (portal.id === 'projects') {
        const tower = new THREE.Mesh(
          new THREE.CylinderGeometry(1.4, 2.6, 11, 8),
          stoneMat
        );
        tower.position.y = 6.2;
        tower.castShadow = true;
        islandGroup.add(tower);

        const lantern = new THREE.Mesh(
          new THREE.CylinderGeometry(1.5, 1.5, 2.2, 8),
          new THREE.MeshStandardMaterial({
            color: 0xffdf9e,
            emissive: 0xe2a856,
            emissiveIntensity: 1.1,
          })
        );
        lantern.position.y = 12.6;
        islandGroup.add(lantern);

        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(2.1, 2.2, 8),
          bronzeMat
        );
        roof.position.y = 14.5;
        islandGroup.add(roof);
        rotatingBeacon = lantern;
      } else if (portal.id === 'dispatch') {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(1.6, 2.1, 7.2, 6),
          stoneMat
        );
        pillar.position.y = 4.2;
        pillar.castShadow = true;
        islandGroup.add(pillar);

        const pavilionRoof = new THREE.Mesh(
          new THREE.ConeGeometry(3.8, 2.8, 6),
          bronzeMat
        );
        pavilionRoof.position.y = 8.8;
        islandGroup.add(pavilionRoof);
      }

      scene.add(islandGroup);
      portalRings.push({
        id: portal.id,
        ring: ringMesh,
        beacon: rotatingBeacon,
        pos: new THREE.Vector3(px, py + 6.2, pz + 5.5),
      });
    });

    // 5. Articulated 3D Bird Mesh (Origami / Sculpted Avian Guide)
    const birdGroup = new THREE.Group();
    birdGroup.position.set(0, 10, 22);

    const bodyFeatherMat = new THREE.MeshStandardMaterial({
      color: 0xfbf8f1,
      roughness: 0.35,
      flatShading: true,
    });
    const wingTipMat = new THREE.MeshStandardMaterial({
      color: 0x3b6245,
      roughness: 0.4,
      flatShading: true,
    });
    const beakMat = new THREE.MeshStandardMaterial({
      color: 0xd49546,
      roughness: 0.3,
    });

    const bodyGeo = new THREE.ConeGeometry(0.55, 2.6, 6);
    bodyGeo.rotateX(-Math.PI / 2);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyFeatherMat);
    bodyMesh.castShadow = true;
    birdGroup.add(bodyMesh);

    const beakGeo = new THREE.ConeGeometry(0.22, 0.75, 5);
    beakGeo.rotateX(-Math.PI / 2);
    const beakMesh = new THREE.Mesh(beakGeo, beakMat);
    beakMesh.position.set(0, 0.08, -1.55);
    birdGroup.add(beakMesh);

    const tailGeo = new THREE.BoxGeometry(0.95, 0.08, 1.1);
    const tailMesh = new THREE.Mesh(tailGeo, wingTipMat);
    tailMesh.position.set(0, 0.12, 1.35);
    tailMesh.rotation.x = 0.18;
    birdGroup.add(tailMesh);

    const leftWingPivot = new THREE.Group();
    leftWingPivot.position.set(-0.35, 0.15, -0.1);
    const wingGeo = new THREE.BoxGeometry(2.35, 0.08, 0.95);
    const leftWingMesh = new THREE.Mesh(wingGeo, bodyFeatherMat);
    leftWingMesh.position.set(-1.15, 0, 0.1);
    leftWingMesh.rotation.y = 0.18;
    leftWingMesh.castShadow = true;
    leftWingPivot.add(leftWingMesh);
    birdGroup.add(leftWingPivot);

    const rightWingPivot = new THREE.Group();
    rightWingPivot.position.set(0.35, 0.15, -0.1);
    const rightWingMesh = new THREE.Mesh(wingGeo, bodyFeatherMat);
    rightWingMesh.position.set(1.15, 0, 0.1);
    rightWingMesh.rotation.y = -0.18;
    rightWingMesh.castShadow = true;
    rightWingPivot.add(rightWingMesh);
    birdGroup.add(rightWingPivot);

    scene.add(birdGroup);

    // 6. Floating Botanical Pollen / Bioluminescent Spores
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 160;
      particlePositions[i * 3 + 1] = Math.random() * 34 + 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0xe2a856,
      size: 0.45,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mobile-Friendly Gesture + Keyboard Flight Controls
    // - Swipe Right (dx > 0) -> Direction goes Left (yaw increases)
    // - Swipe Left (dx < 0)  -> Direction goes Right (yaw decreases)
    // - Long-Press Screen (>= 180ms hold) or W / Space -> Fly Forward
    const keys: Record<string, boolean> = {};
    const canvasEl = renderer.domElement;

    let activePointerId: number | null = null;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let swipeTurnRate = 0;
    let swipePitchRate = 0;
    let isLongPressForward = false;
    let longPressTimer: number | null = null;

    let yaw = 0;
    let pitch = 0;
    let speed = 0;
    let lastOpenedPortal: PortalId | null = null;
    let portalCooldown = 0;

    const clearPointerGesture = () => {
      if (longPressTimer !== null) {
        window.clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      activePointerId = null;
      isLongPressForward = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Only primary touch or primary mouse button on the canvas
      if (e.button !== 0) return;
      activePointerId = e.pointerId;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      canvasEl.setPointerCapture(e.pointerId);

      // Start Long-Press timer (180ms) to engage forward flight
      if (longPressTimer !== null) {
        window.clearTimeout(longPressTimer);
      }
      longPressTimer = window.setTimeout(() => {
        if (activePointerId !== null) {
          isLongPressForward = true;
        }
      }, 180);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (activePointerId !== e.pointerId || !canvasEl.hasPointerCapture(e.pointerId)) {
        return;
      }
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      // Reversed / Pull-World Swipe Steering on BOTH axes:
      // - Swipe Right (dx > 0) -> Direction goes Left (+yaw)
      // - Swipe Left  (dx < 0) -> Direction goes Right (-yaw)
      // - Swipe Down  (dy > 0) -> Direction goes Up (+pitch & climb)
      // - Swipe Up    (dy < 0) -> Direction goes Down (-pitch & descend)
      swipeTurnRate = THREE.MathUtils.clamp(
        swipeTurnRate + dx * 0.085,
        -2.6,
        2.6
      );
      swipePitchRate = THREE.MathUtils.clamp(
        swipePitchRate + dy * 0.055,
        -1.8,
        1.8
      );
    };

    const handlePointerUpOrCancel = (e: PointerEvent) => {
      if (activePointerId === e.pointerId) {
        clearPointerGesture();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.code === 'Space') {
        e.preventDefault();
      }
      keys[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    canvasEl.addEventListener('pointerdown', handlePointerDown);
    canvasEl.addEventListener('pointermove', handlePointerMove);
    canvasEl.addEventListener('pointerup', handlePointerUpOrCancel);
    canvasEl.addEventListener('pointercancel', handlePointerUpOrCancel);
    canvasEl.addEventListener('lostpointercapture', clearPointerGesture);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let frameId = 0;
    let uiTimer = 0;
    const tempProjected = new THREE.Vector3();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      const isDark = themeRef.current === 'dark';
      const targetSkyHex = isDark ? 0x0b130e : 0xf4efe6;
      const targetWaterHex = isDark ? 0x0f1c14 : 0xdce5d8;
      if (scene.background instanceof THREE.Color) {
        scene.background.lerp(new THREE.Color(targetSkyHex), 0.06);
      }
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.lerp(new THREE.Color(targetSkyHex), 0.06);
      }
      waterMat.color.lerp(new THREE.Color(targetWaterHex), 0.06);
      hemiLight.intensity = THREE.MathUtils.lerp(
        hemiLight.intensity,
        isDark ? 0.65 : 1.35,
        0.05
      );
      dirLight.intensity = THREE.MathUtils.lerp(
        dirLight.intensity,
        isDark ? 0.75 : 1.6,
        0.05
      );

      if (portalCooldown > 0) {
        portalCooldown -= dt;
      }

      const isModalOpen = activePortalRef.current !== null;
      const currentAutoPilot = autoPilotRef.current;

      let turnRate = 0;
      let targetPitch = 0;

      if (!isModalOpen) {
        if (currentAutoPilot) {
          // Smooth, responsive Auto-Pilot flight directly to the target portal ring
          // Waits until the bird physically reaches / makes contact with the portal ring before opening
          const targetPortalObj = portalRings.find(
            (p) => p.id === currentAutoPilot
          );
          if (targetPortalObj) {
            const toTarget = new THREE.Vector3().subVectors(
              targetPortalObj.pos,
              birdGroup.position
            );
            const desiredYaw = Math.atan2(-toTarget.x, -toTarget.z);
            let angleDiff = desiredYaw - yaw;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

            turnRate = THREE.MathUtils.clamp(angleDiff * 4.2, -3.4, 3.4);
            yaw += turnRate * dt;

            const horizontalDist = Math.hypot(toTarget.x, toTarget.z);
            targetPitch = THREE.MathUtils.clamp(
              Math.atan2(toTarget.y, Math.max(horizontalDist, 0.5)),
              -0.65,
              0.65
            );
            pitch = THREE.MathUtils.lerp(pitch, targetPitch, 0.16);
            // Slow down slightly if turning sharply so the bird never orbits past the ring
            const alignmentFactor = Math.max(0.35, Math.cos(Math.min(Math.abs(angleDiff), Math.PI / 2)));
            speed = THREE.MathUtils.lerp(speed, 36 * alignmentFactor, 0.12);
          }
        } else {
          // Combine Keyboard (WASD / Space) + Touch/Mouse Long-Press & Inverted Swipe
          const moveForwardActive =
            isLongPressForward ||
            keys['KeyW'] ||
            keys['Space'] ||
            keys['ArrowUp'];
          const moveBackwardActive = keys['KeyS'] || keys['ArrowDown'];

          // Keyboard turning: A / ArrowLeft -> Turn Left (+yaw); D / ArrowRight -> Turn Right (-yaw)
          let keyYawRate = 0;
          if (keys['KeyA'] || keys['ArrowLeft']) keyYawRate += 1.65;
          if (keys['KeyD'] || keys['ArrowRight']) keyYawRate -= 1.65;

          // Combine keyboard turn rate with swipe momentum (Swipe Right -> +yaw Left; Swipe Left -> -yaw Right)
          turnRate = THREE.MathUtils.clamp(
            keyYawRate + swipeTurnRate,
            -2.6,
            2.6
          );
          yaw += turnRate * dt;

          // Smooth momentum decay on horizontal swipe turn rate
          swipeTurnRate *= 0.86;
          if (Math.abs(swipeTurnRate) < 0.01) swipeTurnRate = 0;

          // Vertical reversed swipe (Swipe Down -> Pitch/Climb Up; Swipe Up -> Pitch/Descend Down)
          let keyPitchRate = 0;
          if (keys['KeyE']) keyPitchRate += 1.1;
          if (keys['KeyQ']) keyPitchRate -= 1.1;

          const combinedPitchRate = THREE.MathUtils.clamp(
            keyPitchRate + swipePitchRate,
            -1.8,
            1.8
          );
          pitch = THREE.MathUtils.clamp(
            pitch + combinedPitchRate * dt,
            -0.48,
            0.48
          );

          // Gently ease pitch toward level horizon when no vertical swipe is active
          if (Math.abs(combinedPitchRate) < 0.05) {
            pitch = THREE.MathUtils.lerp(pitch, 0, 0.035);
          }

          swipePitchRate *= 0.84;
          if (Math.abs(swipePitchRate) < 0.01) swipePitchRate = 0;

          let desiredSpeed = 0;
          if (moveForwardActive) {
            desiredSpeed = keys['ShiftLeft'] || keys['ShiftRight'] ? 30 : 22;
          } else if (moveBackwardActive) {
            desiredSpeed = -9;
          }

          speed = THREE.MathUtils.lerp(
            speed,
            desiredSpeed,
            moveForwardActive ? 0.08 : 0.12
          );
          if (Math.abs(speed) < 0.15 && !moveForwardActive && !moveBackwardActive) {
            speed = 0;
          }
        }

        const vx = -Math.sin(yaw) * Math.cos(pitch) * speed * dt;
        const vy = (Math.sin(pitch) * speed + swipePitchRate * 6.5) * dt;
        const vz = -Math.cos(yaw) * Math.cos(pitch) * speed * dt;

        birdGroup.position.x = THREE.MathUtils.clamp(
          birdGroup.position.x + vx,
          -95,
          95
        );
        birdGroup.position.y = THREE.MathUtils.clamp(
          birdGroup.position.y + vy,
          3.5,
          32
        );
        birdGroup.position.z = THREE.MathUtils.clamp(
          birdGroup.position.z + vz,
          -95,
          65
        );
      } else {
        speed = THREE.MathUtils.lerp(speed, 0, 0.12);
      }

      // Apply pitch, yaw, and natural banking roll when turning
      birdGroup.rotation.order = 'YXZ';
      birdGroup.rotation.y = yaw;
      birdGroup.rotation.x = pitch;
      const targetRoll = THREE.MathUtils.clamp(turnRate * 0.36, -0.6, 0.6);
      birdGroup.rotation.z = THREE.MathUtils.lerp(
        birdGroup.rotation.z,
        targetRoll,
        0.12
      );

      // Articulated Wing Flapping Cycle
      const activeSpeed = Math.abs(speed);
      const flapFreq = 4.8 + activeSpeed * 0.28;
      const flapAmplitude = activeSpeed > 1 ? 0.52 : 0.28;
      const flapAngle = Math.sin(elapsed * flapFreq) * flapAmplitude;
      leftWingPivot.rotation.z = flapAngle;
      rightWingPivot.rotation.z = -flapAngle;
      birdGroup.position.y += Math.cos(elapsed * flapFreq) * 0.008;

      // Smooth spring camera chase behind the bird
      const camOffset = new THREE.Vector3(
        Math.sin(yaw) * 11.5,
        3.6 - pitch * 3.0,
        Math.cos(yaw) * 11.5
      );
      const desiredCamPos = birdGroup.position.clone().add(camOffset);
      camera.position.lerp(desiredCamPos, 0.1);

      const lookAhead = new THREE.Vector3(
        birdGroup.position.x - Math.sin(yaw) * 10,
        birdGroup.position.y + pitch * 4,
        birdGroup.position.z - Math.cos(yaw) * 10
      );
      camera.lookAt(lookAhead);

      portalRings.forEach((item, idx) => {
        item.ring.rotation.z = elapsed * 0.6 + idx;
        const scalePulse = 1 + Math.sin(elapsed * 2.4 + idx) * 0.04;
        item.ring.scale.setScalar(scalePulse);

        if (item.beacon) {
          item.beacon.rotation.y = elapsed * 0.85;
        }

        const dist = birdGroup.position.distanceTo(item.pos);

        if (!isModalOpen && dist < 5.6) {
          // If auto-piloting to this specific portal, trigger immediately on contact;
          // if flying manually, respect cooldown so closing the modal doesn't immediately reopen it
          if (
            currentAutoPilot === item.id ||
            (portalCooldown <= 0 && lastOpenedPortal !== item.id)
          ) {
            lastOpenedPortal = item.id;
            portalCooldown = 2.5;
            speed = 0;
            onArriveRef.current(item.id);
          }
        } else if (dist > 12 && lastOpenedPortal === item.id) {
          lastOpenedPortal = null;
        }

        const pinEl = pinRefs.current[item.id];
        if (pinEl) {
          tempProjected.copy(item.pos);
          tempProjected.y += 5.5;
          tempProjected.project(camera);

          const isInFront = tempProjected.z < 1;
          if (isInFront) {
            const x = (tempProjected.x * 0.5 + 0.5) * container.clientWidth;
            const y = (-(tempProjected.y * 0.5) + 0.5) * container.clientHeight;
            pinEl.style.opacity = dist < 95 ? '1' : '0.35';
            pinEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            pinEl.style.pointerEvents = 'auto';
          } else {
            pinEl.style.opacity = '0';
            pinEl.style.pointerEvents = 'none';
          }
        }
      });

      uiTimer += dt;
      if (uiTimer > 0.12) {
        uiTimer = 0;
        setIsPropelling(Math.abs(speed) > 2.5);
      }

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      clearPointerGesture();
      canvasEl.removeEventListener('pointerdown', handlePointerDown);
      canvasEl.removeEventListener('pointermove', handlePointerMove);
      canvasEl.removeEventListener('pointerup', handlePointerUpOrCancel);
      canvasEl.removeEventListener('pointercancel', handlePointerUpOrCancel);
      canvasEl.removeEventListener('lostpointercapture', clearPointerGesture);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const autoPilotPortalMeta = ISLAND_PORTALS.find(
    (p) => p.id === autoPilotTarget
  );

  return (
    <div className="sanctuary-3d-wrapper">
      {/* Subtle non-intrusive propulsion / auto-pilot indicator */}
      <div
        className={`long-press-flight-pill ${
          isPropelling || autoPilotPortalMeta ? 'active' : ''
        }`}
        aria-live="polite"
      >
        <FeatherIcon size={14} />
        <span>
          {autoPilotPortalMeta
            ? `Flying to Island ${autoPilotPortalMeta.numeral} · ${autoPilotPortalMeta.landmarkTitle}...`
            : 'Flying Forward · Swipe to Steer'}
        </span>
      </div>

      {/* Unified Gesture & 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="sanctuary-canvas-mount"
        aria-label="Interactive 3D Botanical Sanctuary — Long-press screen to fly forward, swipe right to turn left, swipe left to turn right"
      />

      {/* 3D-to-2D Projected Island Landmark Pins */}
      <div className="island-marker-layer">
        {ISLAND_PORTALS.map((portal) => (
          <button
            key={portal.id}
            type="button"
            ref={(el) => {
              pinRefs.current[portal.id] = el;
            }}
            className="island-3d-pin"
            onClick={() => onTriggerAutoPilot(portal.id)}
          >
            <span className="island-3d-pin-subtitle">
              Island {portal.numeral} · {portal.name}
            </span>
            <span className="island-3d-pin-title">{portal.landmarkTitle}</span>
            <span className="island-3d-pin-action">
              Fly to Portal <ChevronRightIcon size={12} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
