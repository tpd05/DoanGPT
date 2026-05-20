'use client';

import { useState } from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    number: '01',
    name: 'MOTOBOOK',
    period: '03/2026 - 04/2026',
    description: 'Online motorbike rental system',
    teamSize: 2,
    technologies: 'Java, JSP/Servlet, Maven, MySQL, Tailwind CSS, JavaScript, jBCrypt, Tomcat',
    gitLink: 'https://github.com/tpd05/thuexemay',
    image: '/project1.jpg',
  },
  {
    number: '02',
    name: 'AI Projector Management System',
    period: '09/2025 - 10/2025',
    description: 'AI-integrated projector device management system',
    teamSize: 1,
    technologies: 'Next.js, React, TypeScript, Prisma, MongoDB Atlas, FastAPI, Python, Google Gemini AI',
    gitLink: 'https://github.com/tpd05/quanlymaychieu',
    image: '/project2.png',
  },
  {
    number: '03',
    name: 'Sign Language Classification',
    period: '06/2025 - 07/2025',
    description: 'Sign language classification system',
    teamSize: 4,
    technologies: 'Python, TensorFlow, OpenCV, MediaPipe, Pandas, NumPy, Scikit-learn, Matplotlib, Jupyter',
    gitLink: 'https://github.com/tpd05/Sign-Language-Classification-v1.0',
    image: '/project3.jpg',
  },
];

interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
}

export default function ProjectsSection() {
  return (
    <section className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full flex flex-col items-center">
      {/* Heading */}
      <h2
        className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 w-full"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      {/* Projects */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl px-4">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full" style={{ perspective: '1000px' }}>
      <div
        className="rounded-[20px] sm:rounded-[30px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-5 h-full flex flex-col cursor-pointer transition-transform duration-300 ease-out"
        style={{
          transform: isHovered ? 'rotateY(20deg) rotateX(-5deg)' : 'rotateY(0deg) rotateX(0deg)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 20px 40px rgba(215, 226, 234, 0.2), -10px 10px 30px rgba(0, 0, 0, 0.5)'
            : '0 10px 20px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Row */}
        <div className="mb-4">
          <div
            className="font-black text-[#D7E2EA]"
            style={{ fontSize: 'clamp(2rem, 8vw, 60px)' }}
          >
            {project.number}
          </div>
          <p className="text-[#D7E2EA] font-light text-xs sm:text-sm uppercase tracking-wider mt-2 opacity-70">
            {project.period}
          </p>
          <h3
            className="text-[#D7E2EA] font-black uppercase mt-2"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
          >
            {project.name}
          </h3>
        </div>

        {/* Project Image */}
        <div className="mb-4 rounded-[15px] overflow-hidden h-[150px] sm:h-[180px] flex-shrink-0">
          <Image
            src={project.image}
            alt={project.name}
            width={400}
            height={180}
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Project Details */}
        <div className="flex-1 flex flex-col space-y-3 text-sm">
          {/* Description */}
          <div>
            <p className="text-[#D7E2EA] text-xs sm:text-sm font-light line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Team Size */}
          <div>
            <p className="text-[#D7E2EA] text-xs font-light opacity-60">TEAM</p>
            <p className="text-[#D7E2EA] text-xs font-semibold">
              {project.teamSize} {project.teamSize === 1 ? 'member' : 'members'}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex-1">
            <p className="text-[#D7E2EA] text-xs font-light opacity-60 mb-1">
              TECH
            </p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.split(', ').slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[rgba(215,226,234,0.1)] text-[#D7E2EA] text-xs font-light rounded-full whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.split(', ').length > 3 && (
                <span className="px-2 py-1 text-[#D7E2EA] text-xs font-light opacity-60">
                  +{project.technologies.split(', ').length - 3}
                </span>
              )}
            </div>
          </div>

          {/* GitHub Button */}
          <a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 bg-[#D7E2EA] text-[#0C0C0C] font-semibold rounded-full hover:bg-opacity-80 transition-all text-center text-xs sm:text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
