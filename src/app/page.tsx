'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import AboutTab from '@/components/AboutTab';
import CVTab from '@/components/CVTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'about' | 'cv'>('about');
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef<HTMLElement | null>(null);

  // Track scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrollY(el.scrollTop);
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate background gradient progress based on scroll
  const scrollProgress = Math.min(1, scrollY / 1000);
  const backgroundColor = `rgb(${Math.round(255 - scrollProgress * 30)}, ${Math.round(240 - scrollProgress * 60)}, ${Math.round(240 - scrollProgress * 60)})`;
  const viaColor = `rgb(${Math.round(220 - scrollProgress * 40)}, ${Math.round(150 - scrollProgress * 50)}, ${Math.round(150 - scrollProgress * 50)})`;

  return (
    <div className="min-h-screen relative" style={{ background: `linear-gradient(to bottom right, ${backgroundColor}, ${viaColor}, ${backgroundColor})` }}>
      {/* Fixed gradient background */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ 
        background: `linear-gradient(135deg, ${backgroundColor} 0%, ${viaColor} 50%, ${backgroundColor} 100%)`,
        transition: 'background 0.1s ease-out'
      }} />

      {/* HERO Content */}
      <div ref={scrollRef as React.Ref<HTMLDivElement>} className="h-screen overflow-y-auto snap-y snap-proximity scroll-smooth relative z-0 bg-transparent">

        {/* Full-width Hero Section */}
        <div className="w-screen">
          <Hero />
        </div>

        {/* Constrained main content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-0 bg-transparent">

        <section className="snap-start bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation Bar*/}
          <div
            className="flex border-b-2 border-gray-200 transition-all duration-300 rounded-t-lg"
          >
            <button
              onClick={() => setActiveTab('about')} //About Tab button
              className={`w-1/2 py-4 px-8 font-semibold text-lg transition-all duration-300 rounded-tl-lg ${
                activeTab === 'about'
                  ? 'text-white' //Active Colour
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200' //Inactive Colour
              }`}
              style={activeTab === 'about' ? { backgroundColor: 'var(--accent-primary)' } : {}}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('cv')} // CV Tab Button
              className={`w-1/2 py-4 px-8 font-semibold text-lg transition-all duration-300 rounded-tr-lg ${
                activeTab === 'cv'
                  ? 'text-white' //Active Colour
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200' //Inactive Colour
              }`}
              style={activeTab === 'cv' ? { backgroundColor: 'var(--accent-primary)' } : {}}
            >
              CV
            </button>
          </div>

          {/* About Tab */}
          {activeTab === 'about' && <AboutTab />}

          {/* CV Tab */}
          {activeTab === 'cv' && <CVTab />}

        </section>
      </main>
      </div>

      {/* Footer */}
      <footer className="text-white py-8 mt-16 relative z-10" style={{ backgroundColor: 'var(--accent-dark)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2026 Victor Boddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

