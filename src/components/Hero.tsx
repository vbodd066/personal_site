'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { resumeData } from '@/data/resumeData';
import ZikaVirus from './3d/ZikaVirus';
import ProteinStructure from './3d/ProteinStructure';

export default function Hero() {
  return (
    <section
      className="relative mb-16 pt-32 pb-16 overflow-visible min-h-screen snap-start"
      style={{
        background: 'transparent',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {/* Zika Virus Canvas - Left Side */}
        <div className="absolute pointer-events-none ml-10 mt-12 flex items-center justify-center overflow-visible" style={{ left: '-100px', top: '16px', width: '768px', height: '768px' }}>
          <Canvas
            className="w-full h-full" //Load the zika virus 3d model
            camera={{ position: [0, 0, 1], fov: 30 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 3]} intensity={1.2} />
            <Suspense fallback={null}>
              <ZikaVirus progress={1} hideProgress={0} />
            </Suspense>
          </Canvas>
        </div>
      </div>


      <div className="relative">
        <h1 className="text-8xl sm:text-8xl md:text-8xl font-bold text-gray-900 mb-4 z-10 mt-0 text-right mr-70 sm:ml-140 md:ml-140">
          <span
            className="text-transparent bg-clip-text hero-name-animate"
            style={{
              backgroundImage: `linear-gradient(to right, var(--accent-dark), var(--accent-primary), var(--accent-dark))`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text'
            }}
          >
            Victor Boddy
          </span>
        </h1>
        <p className="text-2xl text-gray-700 mb-8 mt-2 mr-70 relative z-10 text-right">
          Interested in <strong>synthetic biology</strong>, <strong>cool microbes</strong>, <strong>AI</strong>,<br/>
          and building things that actually <strong>help people!</strong>
        </p>
        <p className="text-lg text-gray-700 mb-8 z-10 text-right mr-55 max-w-2xl ml-auto">
          Biotechnology student with extensive wet lab, synthetic biology, and bioinformatics experience, and leadership in large-scale research projects. Proven ability to secure funding, lead interdisciplinary teams, and run full pipelines from sampling to sequencing to analysis. Strong communicator, mentor, and award-winning project lead.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8 relative z-10 text-center">
          <a
            href={`mailto:${resumeData.email}`}
            className="text-white px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{
              background: `linear-gradient(to right, var(--accent-dark), var(--accent-primary))`
            }}
          >
            Get In Touch
          </a>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold border-2"
            style={{
              borderColor: 'var(--accent-primary)',
              color: 'var(--accent-primary)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-light)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            LinkedIn Profile
          </a>
        </div>
      </div>

      {/* Protein Structure Canvas - Right Side */}
      <div className="absolute bottom-0 right-15 w-96 h-96 pointer-events-none z-0">
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0, 200], fov: 45 }} //the third value is the camera distance and can effect the size of the protein structure
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <ProteinStructure />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6"
          style={{ color: 'var(--accent-primary)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
