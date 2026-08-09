"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AICM3DHeroProps {
  onOpenDiagnostic: () => void;
  onOpenVideo: () => void;
}

export default function AICM3DHeroComponent({ onOpenDiagnostic, onOpenVideo }: AICM3DHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const storeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#FAF8FF");
    scene.fog = new THREE.FogExp2("#FAF8FF", 0.012);

    // 2. Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7, 17);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight("#FAF5FF", 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("#FFFFFF", 2.2);
    dirLight.position.set(12, 22, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    // Purple Accent Light (Pulsing Intensity)
    const purpleLight = new THREE.PointLight("#A855F7", 14, 35);
    purpleLight.position.set(3, 2, 0);
    scene.add(purpleLight);

    // Cyan Secondary Rim Light
    const cyanLight = new THREE.PointLight("#38BDF8", 7, 30);
    cyanLight.position.set(-8, 4, -4);
    scene.add(cyanLight);

    // 5. Floor & Platform
    const floorGeo = new THREE.PlaneGeometry(90, 90);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xFDFBFF,
      roughness: 0.25,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid helper on floor
    const grid = new THREE.GridHelper(60, 40, 0xC084FC, 0xE9D5FF);
    grid.position.y = -1.99;
    (grid.material as THREE.Material).opacity = 0.28;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);

    // 6. Rotating Curved Ring / Torus (AICM Style)
    const ringGeo = new THREE.TorusGeometry(5.4, 0.45, 32, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.15,
      metalness: 0.1,
      emissive: 0xF3E8FF,
      emissiveIntensity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(2, 0.2, -1);
    ring.rotation.x = Math.PI / 2.6;
    ring.rotation.y = -Math.PI / 8;
    ring.castShadow = true;
    ring.receiveShadow = true;
    scene.add(ring);

    // Glowing Laser Ring Track Accent
    const innerTrackGeo = new THREE.TorusGeometry(5.4, 0.08, 16, 100);
    const innerTrackMat = new THREE.MeshBasicMaterial({ color: 0xC084FC });
    const innerTrack = new THREE.Mesh(innerTrackGeo, innerTrackMat);
    innerTrack.position.copy(ring.position);
    innerTrack.rotation.copy(ring.rotation);
    scene.add(innerTrack);

    // 7. Shiny 3D Gold Coin (Orbiting Ring Track)
    const coinGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.18, 32);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xFACC15,
      roughness: 0.1,
      metalness: 0.94,
      emissive: 0x854D0E,
      emissiveIntensity: 0.15
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.castShadow = true;
    scene.add(coin);

    // 8. Architectural Step Platform Right
    const stepGeo = new THREE.BoxGeometry(7, 3.4, 10);
    const stepMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.2,
      metalness: 0.05
    });
    const step = new THREE.Mesh(stepGeo, stepMat);
    step.position.set(7.5, -0.3, -2.5);
    step.rotation.y = -Math.PI / 7;
    step.castShadow = true;
    step.receiveShadow = true;
    scene.add(step);

    // 9. Floating 3D Geometric Blocks & Particles
    const blockGroup = new THREE.Group();

    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMat = new THREE.MeshStandardMaterial({ color: 0xE0E7FF, roughness: 0.2, metalness: 0.2 });
    const cube1 = new THREE.Mesh(cubeGeo, cubeMat);
    cube1.position.set(-6, 2, -3);
    cube1.castShadow = true;
    blockGroup.add(cube1);

    const icoGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const icoMat = new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.3, metalness: 0.1 });
    const ico1 = new THREE.Mesh(icoGeo, icoMat);
    ico1.position.set(7.5, 3.2, 2.5);
    ico1.castShadow = true;
    blockGroup.add(ico1);

    scene.add(blockGroup);

    // Floating Particles
    const particleCount = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 45;
      pPos[i + 1] = Math.random() * 16;
      pPos[i + 2] = (Math.random() - 0.5) * 45;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xC084FC,
      size: 0.13,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 10. Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 7;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);
      targetCameraX = mouseX * 2.2;
      targetCameraY = 7 + mouseY * 1.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 11. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow ring rotation
      ring.rotation.z = elapsedTime * 0.14;
      ring.rotation.y = -Math.PI / 8 + Math.sin(elapsedTime * 0.4) * 0.04;

      // Coin Orbiting along ring
      const orbitAngle = elapsedTime * 0.75;
      const orbitRadius = 5.4;
      coin.position.x = ring.position.x + Math.cos(orbitAngle) * orbitRadius;
      coin.position.z = ring.position.z + Math.sin(orbitAngle) * orbitRadius * 0.5;
      coin.position.y = ring.position.y + Math.sin(orbitAngle) * 1.8 + 0.4;
      coin.rotation.y = elapsedTime * 2.2;
      coin.rotation.z = Math.sin(elapsedTime * 1.5) * 0.2;

      // Floating blocks bobbing
      cube1.position.y = 2 + Math.sin(elapsedTime * 1.4) * 0.4;
      cube1.rotation.x = elapsedTime * 0.5;
      cube1.rotation.y = elapsedTime * 0.7;

      ico1.position.y = 3.2 + Math.cos(elapsedTime * 1.6) * 0.35;
      ico1.rotation.y = elapsedTime * 0.8;

      // Purple light pulsing intensity (0.4 -> 0.8 -> 0.5)
      purpleLight.intensity = 9 + Math.sin(elapsedTime * 1.8) * 6;

      // Particle float up
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.009;
        if (positions[i] > 16) positions[i] = 0;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Smooth camera lerp parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.045;
      camera.position.y += (targetCameraY - camera.position.y) * 0.045;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero-home" style={{ position: "relative", minHeight: "88vh", width: "100%", overflow: "hidden", background: "#FAF8FF" }}>
      
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {/* HTML Overlay Content */}
      <div style={{ position: "relative", zIndex: 2, pointerEvents: "none", height: "100%", display: "flex", alignItems: "center", paddingTop: "120px", paddingBottom: "4rem" }}>
        <div className="container" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2.5rem", alignItems: "center" }} className="hero-split-grid">
            
            {/* Left Content Column (Interactive) */}
            <div style={{ pointerEvents: "auto", textAlign: "left" }} className="hero-left-content">
              
              {/* Eyebrow Pill Badge */}
              <div className="hero-badge" style={{ background: "rgba(255, 255, 255, 0.92)", backdropFilter: "blur(12px)", border: "1.5px solid #E9D5FF", color: "#7C3AED", boxShadow: "0 4px 16px rgba(124, 58, 237, 0.08)" }}>
                <span className="hero-badge-dot" style={{ background: "#A855F7", boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }} />
                India&apos;s Trusted E-Commerce Operations Partner | Pan-India Presence
              </div>

              {/* Headline */}
              <h1 className="hero-headline-etail" style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)", fontWeight: 900, lineHeight: 1.15, color: "#0F172A", letterSpacing: "-2px" }}>
                We help businesses attract more customers,<br />
                automate operations &amp; grow faster.
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle-etail" style={{ fontSize: "1.1rem", color: "#475569", lineHeight: 1.68, marginBottom: "2.2rem" }}>
                Marketplace, D2C &amp; B2B growth—managed through one accountable operating model.
              </p>

              {/* Primary CTA & Secondary Action Row */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                <button
                  className="btn-primary-hero"
                  onClick={onOpenDiagnostic}
                  style={{
                    height: "52px",
                    padding: "0 2rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                    color: "#FFFFFF",
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)"
                  }}
                >
                  Request for a FREE AUDIT →
                </button>
                <button className="btn-ghost-hero" onClick={onOpenVideo} style={{ background: "#FFFFFF", border: "1.5px solid #CBD5E1", color: "#0F172A", height: "52px", borderRadius: "14px" }}>
                  ▷ Watch Our Story
                </button>
              </div>
            </div>

            {/* Right Column Spacer for Desktop */}
            <div style={{ height: "480px", pointerEvents: "none" }} />

          </div>
        </div>
      </div>
    </section>
  );
}
