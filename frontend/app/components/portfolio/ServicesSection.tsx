'use client';

import FadeIn from '../reusable/FadeIn';

const EXPERIENCES = [
  {
    number: '01',
    period: '02/2026 - Present',
    company: 'AI Research Intern',
    organization: 'Artificial Intelligence Research Institute',
    description:
      'Participated in learning, researching, and developing AI systems. Worked with data analysis, training machine learning models, and testing AI solutions.',
  },
  {
    number: '02',
    period: '03/2025 - 04/2025',
    company: 'Backend Web Developer Intern',
    organization: 'Hachitech Solution',
    description:
      'Learned and applied Next.js and React in building web applications. Collaborated with team members to understand system architecture, improve problem-solving skills, and debug issues in real-world environments.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      {/* Experiences List */}
      <div className="max-w-5xl mx-auto">
        {EXPERIENCES.map((exp, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div
              className={`flex items-start gap-6 md:gap-12 py-8 sm:py-10 md:py-12 ${
                idx !== EXPERIENCES.length - 1
                  ? 'border-b border-[rgba(12,12,12,0.15)]'
                  : ''
              }`}
              style={{
                marginBottom: idx === 0 ? '4rem' : '0',
              }}
            >
              {/* Number */}
              <div
                className="font-black text-[#0C0C0C] flex-shrink-0"
                style={{ 
                  fontSize: 'clamp(3rem, 10vw, 140px)',
                  minWidth: '140px',
                  textAlign: 'right',
                }}
              >
                {exp.number}
              </div>

              {/* Content */}
              <div 
                className="flex flex-col justify-start gap-2 sm:gap-3"
                style={{
                  marginLeft: idx === 0 ? '1rem' : '0',
                }}
              >
                <p
                  className="font-light text-[#0C0C0C] opacity-70"
                  style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1rem)' }}
                >
                  {exp.period}
                </p>
                <h3
                  className="font-semibold uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {exp.company}
                </h3>
                <p
                  className="font-light text-[#0C0C0C] opacity-50"
                  style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)' }}
                >
                  {exp.organization}
                </p>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl mt-2"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {exp.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
