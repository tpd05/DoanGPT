'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className} style={style} suppressHydrationWarning>
      {characters.map((char, index) => (
        <CharacterReveal
          key={index}
          character={char}
          progress={scrollYProgress}
          index={index}
          total={characters.length}
        />
      ))}
    </p>
  );
}

interface CharacterRevealProps {
  character: string;
  progress: any;
  index: number;
  total: number;
}

function CharacterReveal({
  character,
  progress,
  index,
  total,
}: CharacterRevealProps) {
  const opacity = useTransform(
    progress,
    [0, index / total, (index + 1) / total, 1],
    [0.2, 0.2, 1, 1]
  );

  return (
    <motion.span style={{ opacity }}>
      {character}
    </motion.span>
  );
}
