'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';

export default function ProteinStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    console.log('ProteinStructure component mounted');
    const loader = new PDBLoader();
    
    const onLoad = (pdb: any) => {
      console.log('✓ PDB loaded successfully');

      const geometryAtoms = pdb.geometryAtoms;
      const geometryBonds = pdb.geometryBonds;

      console.log('Atoms vertices:', geometryAtoms.attributes.position?.count);
      console.log('Bonds vertices:', geometryBonds.attributes.position?.count);

      // Render atoms as points instead of lines
      const atomsPointsMaterial = new THREE.PointsMaterial({ 
        color: 0xff4444,
        size: 3,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: false
      });
      const atomsPoints = new THREE.Points(geometryAtoms, atomsPointsMaterial);

      // Render bonds as lines
      const bondsMaterial = new THREE.LineBasicMaterial({ 
        color: 0xcc0000,
        linewidth: 2,
        transparent: true,
        opacity: 0.9
      });
      const bonds = new THREE.LineSegments(geometryBonds, bondsMaterial);

      if (groupRef.current) {
        // Don't clear - keep test cube, add PDB geometry alongside it
        groupRef.current.add(atomsPoints);
        groupRef.current.add(bonds);
        
        // Only center, don't scale - let camera handle the view
        const box = new THREE.Box3().setFromObject(atomsPoints);
        const center = box.getCenter(new THREE.Vector3());
        atomsPoints.position.sub(center);
        bonds.position.sub(center);
        
        console.log('✓ Protein centered at origin');
      }
    };

    const onProgress = (progress: any) => {
      const percent = Math.round((progress.loaded / progress.total) * 100);
      console.log('Loading PDB: ' + percent + '%');
    };

    const onError = (error: any) => {
      console.error('✗ Error loading PDB:', error);
    };

    console.log('Starting to load PDB from /5F9R.pdb');
    loader.load('/5F9R.pdb', onLoad, onProgress, onError);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.003;
    }
  });

  return <group ref={groupRef}>
    {/* Test cube to verify Canvas is working */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  </group>;
}
