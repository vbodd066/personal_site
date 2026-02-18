'use client';

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';

export default function ProteinStructure() {
  const { scene } = useGLTF('/crispr_hero_opt.glb');
  const pivot = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const screenFill = 0.75;

  useLayoutEffect(() => {
    if (!pivot.current || !spinner.current) return;

    spinner.current.add(scene);

    // Center the model at origin
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const ctr = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(ctr);
    scene.position.sub(ctr);

    // Scale to fill the viewport
    const vHeight =
      2 * Math.tan(((45 * Math.PI) / 180) / 2) * Math.abs(camera.position.z);
    const modelHeight = Math.max(size.y, size.x, size.z, 1e-4);
    const scale = (screenFill * vHeight) / modelHeight;
    pivot.current.scale.setScalar(scale);

    console.log('✓ CRISPR-Cas9 GLTF loaded and centered');

    // Make only chain B (green / Cas9 surface) translucent based on material color
    const greenColor = new THREE.Color(0, 1, 0); // PyMOL "green"
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.color) {
          const c = mat.color;
          // Check if the material color is predominantly green (chain B from PyMOL)
          if (c.g > c.r && c.g > c.b) {
            child.material = mat.clone();
            (child.material as THREE.MeshStandardMaterial).transparent = true;
            (child.material as THREE.MeshStandardMaterial).opacity = 0.4;
            (child.material as THREE.MeshStandardMaterial).depthWrite = false;
            (child.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
            child.renderOrder = -1;
          }
        }
      }
    });

    console.log(`✓ Traversed ${scene.children.length} top-level objects`);
  }, [scene, camera]);

  useFrame(({ clock }) => {
    if (!spinner.current) return;
    spinner.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={pivot}>
      <group ref={spinner} />
    </group>
  );
}

useGLTF.preload('/crispr_hero_opt.glb');
