'use client';

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

function highlightAuthorName(text: string, targetName: string): React.ReactNode[] {
  const parts = text.split(new RegExp(`(${targetName})`, 'i'));
  return parts.map((part, index) =>
    part.toLowerCase() === targetName.toLowerCase() ? (
      <span key={index} className="font-bold" style={{ color: 'var(--accent-dark)' }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function CVTab() {
  const tabSpring = useSpring({
    opacity: 1,
    config: { duration: 300 },
  });

  return (
    <animated.div className="space-y-16 p-8" style={tabSpring}>
      {/* Education Section */}
      <ScrollReveal delay={0}>
        <section className="bg-white rounded-lg shadow-md p-8 snap-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-8">
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="pl-6 pb-8" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{edu.degree}</h3>
                  <span className="text-sm text-gray-500 font-medium">{edu.dates}</span>
                </div>
                <p className="font-medium text-base leading-relaxed" style={{ color: 'var(--accent-primary)' }}>{edu.school}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{edu.program}</p>
                <p className="text-sm text-gray-600 leading-relaxed">GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Projects Section */}
      <ScrollReveal delay={100}>
        <section className="bg-white rounded-lg shadow-md p-8 snap-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Projects</h2>
          <div className="space-y-6">
            {[...resumeData.projects].reverse().map((project: any, index: number) => (
              <div key={index} className="pb-8 border-b border-gray-200 last:border-0">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{project.title}</h3>
                  <span className="text-sm text-gray-500 font-medium">{project.year}</span>
                </div>
                <p className="font-medium text-base leading-relaxed" style={{ color: 'var(--accent-primary)' }}>{project.organization}</p>
                <p className="text-base text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-semibold text-sm inline-flex items-center transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-dark)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Publications Section */}
      <ScrollReveal delay={200}>
        <section className="bg-white rounded-lg shadow-md p-8 snap-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Publications</h2>
          <div className="space-y-8">
            {resumeData.publications.map((pub: any, index: number) => (
              <div key={index} className="pb-8 border-b border-gray-200 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-relaxed">{pub.title}</h3>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                  <span className="italic">{pub.journal}</span> ({pub.year})
                </p>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">{highlightAuthorName(pub.authors, resumeData.name)}</p>
                {pub.doi && (
                  <a
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-semibold text-sm inline-flex items-center leading-relaxed transition-colors"
                    style={{ color: 'var(--accent-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-dark)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                  >
                    View Publication →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Experience Section */}
      <ScrollReveal delay={300}>
        <section className="bg-white rounded-lg shadow-md p-8 snap-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} className="pl-6 pb-8" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">{exp.title}</h3>
                  <span className="text-sm text-gray-500 font-medium">{exp.dates}</span>
                </div>
                <p className="font-medium text-base leading-relaxed" style={{ color: 'var(--accent-primary)' }}>{exp.organization}</p>
                <p className="text-base text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Awards Section */}
      <ScrollReveal delay={400}>
        <section className="bg-white rounded-lg shadow-md p-8 snap-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Awards & Recognition</h2>
          <div className="space-y-5">
            {resumeData.awards.map((award: any, index: number) => (
              <div key={index} className="pb-5 border-b border-gray-200 last:border-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-gray-900 leading-relaxed">{award.title}</h3>
                  <span className="text-sm text-gray-500 font-medium">{award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </animated.div>
  );
}
