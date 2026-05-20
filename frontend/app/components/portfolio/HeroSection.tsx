'use client';

import Image from 'next/image';
import FadeIn from '../reusable/FadeIn';
import ContactButton from '../reusable/ContactButton';
import Magnet from '../reusable/Magnet';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-x-clip">
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="px-6 md:px-10 pt-6 md:pt-8 flex justify-center">
          <div className="flex gap-12 md:gap-16 lg:gap-20 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            <a href="#about" className="hover:opacity-70 transition-opacity duration-200">
              About
            </a>
            <a href="#price" className="hover:opacity-70 transition-opacity duration-200">
              Price
            </a>
            <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">
              Projects
            </a>
            <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">
              Contact
            </a>
          </div>
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40}>
        <div className="overflow-hidden flex-1 flex items-center justify-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
            Hi, i&apos;m ĐOÀN
          </h1>
        </div>
      </FadeIn>


      {/* Hero Portrait */}
      <FadeIn delay={0.6} y={30}>
        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
          <Magnet padding={150} strength={3}>
            <Image
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack Portrait"
              width={520}
              height={600}
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] h-auto object-contain"
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 440px, 520px"
            />
          </Magnet>
        </div>
      </FadeIn>
    </section>
  );
}
