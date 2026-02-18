'use client';

import Image from 'next/image';
import { resumeData } from '@/data/resumeData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { animated, useSpring } from 'react-spring';

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const spring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
    config: { duration: 800 },
    delay: delay,
  });

  return (
    <animated.div 
      ref={ref}
      style={spring}
    >
      {children}
    </animated.div>
  );
}

export default function AboutTab() {
  const tabSpring = useSpring({
    opacity: 1,
    config: { duration: 300 },
  });

  return (
    <animated.div className="space-y-16 p-8" style={tabSpring}>
      {/* About Section */}
      <ScrollReveal delay={0}>
        <section className="relative bg-white rounded-lg shadow-md overflow-hidden">
          {/* Content */}
          <div className="relative p-8 grid md:grid-cols-3 gap-12 items-start">
            {/* Text Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">About Me</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 line-height-relaxed">
                Beyond my work in biotechnology and research, I&apos;m driven by a passion for pushing myself physically and mentally. I believe that the discipline and problem-solving skills developed in sports translate directly to success in science and leadership. I&apos;m someone who thrives on challenges, whether in the lab or on the mountain.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed line-height-relaxed">
                When I&apos;m not working on synthetic biology projects, you&apos;ll likely find me pursuing my diverse interests in competitive and outdoor activities. I&apos;m constantly seeking new experiences and ways to challenge myself in all aspects of life.
              </p>
            </div>

            {/* Headshot */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <Image
                  src="/headshot.jpg"
                  alt={resumeData.name}
                  width={250}
                  height={320}
                  className="rounded-full shadow-lg object-cover hover:scale-105 transition-transform duration-500 group-hover:shadow-xl"
                  priority
                />
                <div 
                  className="absolute inset-0 rounded-full transition-all duration-500 group-hover:from-opacity-10"
                  style={{
                    background: `linear-gradient(135deg, var(--accent-primary)/0, transparent, var(--accent-primary)/0)`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Interests & Hobbies Section */}
      <ScrollReveal delay={100}>
        <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">Interests & Hobbies</h2>
        <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 flex items-center leading-relaxed" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">♟️</span> Chess
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 line-height-relaxed">
                  A competitive chess player with a deep appreciation for strategy and tactics. Chess teaches patience, forward-thinking, and the ability to adapt to rapidly changing situations—skills that are invaluable in research and project management.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="text-sm text-gray-700 font-medium space-y-1">
                    <div><span className="font-semibold">Rating:</span> {'>'}2000 Elo</div>
                    <div><span className="font-semibold">Membership:</span> CFC</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">🎿</span> Skiing & Snowboarding
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  An avid skier and snowboarder with a passion for carving down mountains and exploring varied terrain. There&apos;s nothing quite like the feeling of navigating challenging slopes and embracing the rush of speed and control.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="text-sm text-gray-700 font-medium mb-2">
                    <span className="font-semibold">Certifications:</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• CSIA Level 2 Ski Instructor</li>
                    <li>• CASI Level 1 Snowboard Instructor</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">🏔️</span> Ski Patrol
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Actively involved in ski patrol, where I combine my passion for skiing with a commitment to mountain safety and rescue operations. It&apos;s incredibly rewarding to contribute to the safety of others while enjoying the mountains I love.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="text-sm text-gray-700 font-medium">
                    <span className="font-semibold">Certification:</span> Advanced First Aid
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">🧗</span> Rock Climbing
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  A dedicated climber who thrives on vertical challenges and problem-solving on the wall. Rock climbing combines physical strength, mental fortitude, and technical skill—it&apos;s a perfect complement to my scientific pursuits.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="text-sm text-gray-700 font-medium mb-2">
                    <span className="font-semibold">Certifications & Roles:</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Top Rope Climbing Certified</li>
                    <li>• Lead Climbing Certified</li>
                    <li>• Bouldering Competition Judge</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">🚴</span> Road Cycling & Triathlons
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Passionate road cyclist and triathlete, I enjoy working on endurance training and race preparation, you will regularly find me doing half marathons or 100-mile rides on weekends in the summer.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Half Ironman</li>
                    <li>• Full marathon</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center" style={{ color: 'var(--accent-primary)' }}>
                  <span className="text-2xl mr-3">🤿</span> Scuba Diving
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  A certified scuba diver exploring the underwater world and marine ecosystems. Diving offers a unique perspective on biodiversity and environmental conservation, connecting my personal interests with my scientific passion.
                </p>
                <div className="p-3 rounded" style={{ backgroundColor: 'var(--accent-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div className="text-sm text-gray-700 font-medium mb-2">
                    <span className="font-semibold">Certifications:</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• PADI Divemaster</li>
                    <li>• Master Scuba Diver</li>
                    <li>• Emergency First Responder Instructor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Some of my favourite photos and highlights!</h3>
            <div className="carousel-container">
              <div className="carousel-track">
                {[...resumeData.hobbiesCarousel, ...resumeData.hobbiesCarousel].map((item, index) => (
                  <div key={`${item.src}-${index}`} className="carousel-item">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={420}
                      height={280}
                      className="carousel-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </animated.div>
  );
}
