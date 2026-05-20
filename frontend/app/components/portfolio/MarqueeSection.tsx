'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FadeIn from '../reusable/FadeIn';

const MARQUEE_IMAGES = [
  'https://skillicons.dev/icons?i=html',
  'https://skillicons.dev/icons?i=css',
  'https://skillicons.dev/icons?i=c',
  'https://skillicons.dev/icons?i=cpp',
  'https://skillicons.dev/icons?i=java',
  'https://skillicons.dev/icons?i=python',
  'https://skillicons.dev/icons?i=php',
  'https://skillicons.dev/icons?i=mysql',
  'https://skillicons.dev/icons?i=vscode',
  'https://skillicons.dev/icons?i=visualstudio',
  'https://skillicons.dev/icons?i=postman',
  'https://skillicons.dev/icons?i=eclipse',
  'https://skillicons.dev/icons?i=git',
  'https://skillicons.dev/icons?i=github',
  'https://skillicons.dev/icons?i=mysql',
  'https://skillicons.dev/icons?i=unreal',
];

const ROW_1_IMAGES = MARQUEE_IMAGES.slice(0, 4);
const ROW_2_IMAGES = MARQUEE_IMAGES.slice(4, 8);
const ROW_3_IMAGES = MARQUEE_IMAGES.slice(8, 12);
const ROW_4_IMAGES = MARQUEE_IMAGES.slice(12, 16);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Chỉ bắt đầu animation khi section vào viewport
      // Nếu sectionTop > windowHeight: chưa tới section, offset = 0
      // Nếu sectionTop <= windowHeight: section đã visible, bắt đầu animation
      const scrollOffset = Math.max(0, (windowHeight - sectionTop) * 0.3);

      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-20 overflow-hidden px-8"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
        SKILL
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <h3 className="text-left text-[#D7E2EA] text-3xl md:text-4xl font-semibold mb-12 mt-12 pl-8">
          &lt;Programming&gt;
        </h3>
      </FadeIn>

      {/* Row 1 */}
      <div
        className="flex gap-3 justify-center"
        style={{
          willChange: 'transform',
          transform: `translateX(${offset}px)`,
          marginBottom: '2rem',
        }}
      >
        {ROW_1_IMAGES.map((img, idx) => (
          <div
            key={`row1-${idx}`}
            className="flex-shrink-0 w-[280px] h-[180px] rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Logo ${idx}`}
              width={300}
              height={300}
              className="w-[75%] h-[75%] object-contain"
              loading="lazy"        
              unoptimized

            />
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div
        className="flex gap-3 justify-center"
        style={{
          willChange: 'transform',
          transform: `translateX(${-offset}px)`,
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {ROW_2_IMAGES.map((img, idx) => (
          <div
            key={`row2-${idx}`}
            className="flex-shrink-0 w-[280px] h-[180px] rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Logo ${idx}`}
              width={300}
              height={300}
              className="w-[75%] h-[75%] object-contain"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
      <FadeIn delay={0.1} y={20}>
        <h3 className="text-left text-[#D7E2EA] text-3xl md:text-4xl font-semibold mb-12 mt-12 pl-8">
          &lt;IT Tools&gt;
        </h3>
      </FadeIn>
      {/* Row 3 */}
      <div
        className="flex gap-3 justify-center"
        style={{
          willChange: 'transform',
          transform: `translateX(${offset}px)`,
          
          marginBottom: '2rem',
        }}
      >
        {ROW_3_IMAGES.map((img, idx) => (
          <div
            key={`row3-${idx}`}
            className="flex-shrink-0 w-[280px] h-[180px] rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Logo ${idx}`}
              width={300}
              height={300}
              className="w-[75%] h-[75%] object-contain"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Row 4 */}
      <div
        className="flex gap-3 justify-center"
        style={{
          willChange: 'transform',
          transform: `translateX(${-offset}px)`,
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {ROW_4_IMAGES.map((img, idx) => (
          <div
            key={`row4-${idx}`}
            className="flex-shrink-0 w-[280px] h-[180px] rounded-2xl overflow-hidden bg-white flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Logo ${idx}`}
              width={300}
              height={300}
              className="w-[75%] h-[75%] object-contain"
              loading="lazy"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
