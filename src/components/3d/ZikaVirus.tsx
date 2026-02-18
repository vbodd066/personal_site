'use client';

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { easeIn } from "framer-motion";

type ZikaVirusProps = {
  progress: number;
  hideProgress: number;
};

const ZikaVirus = ({ progress, hideProgress }: ZikaVirusProps) => {
  const { scene } = useGLTF("https://static.igem.wiki/teams/5707/homepage/virus.glb");
  const pivot = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const screenFill = 0.6;

  useLayoutEffect(() => {
    if (!pivot.current || !spinner.current) return;

    spinner.current.add(scene);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const ctr = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(ctr);
    scene.position.sub(ctr);

    const vHeight =
      2 * Math.tan((30 * Math.PI / 180) / 2) * Math.abs(camera.position.z);

    const modelHeight = Math.max(size.y, 1e-4);
    const scale = (screenFill * vHeight) / modelHeight;
    pivot.current.scale.setScalar(scale);
  }, [scene, camera]);

  useFrame(({ clock }) => {
    if (!pivot.current || !spinner.current) return;
    spinner.current.rotation.y = clock.getElapsedTime() * 0.4;
    // Keep position fixed at center
    pivot.current.position.x = 0;
    pivot.current.position.y = 0;
  });

  return (
    <group ref={pivot}>
      <group ref={spinner} />
    </group>
  );
};

export default ZikaVirus;
