'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const stars: Star[] = [];
    const starCount = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * 1000,
        size: Math.random() * 2,
      });
    }

    let animationId: number;
    let speed = 2;

    const animate = () => {
      // Clear canvas with dark background
      ctx.fillStyle = '#0C0C0C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(12, 12, 12, 1)');
      gradient.addColorStop(0.5, 'rgba(20, 15, 40, 0.8)');
      gradient.addColorStop(1, 'rgba(12, 12, 12, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        star.z -= speed;

        // Reset star if it goes too close
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        // Calculate 3D projection
        const scale = 1000 / star.z;
        const x = star.x * scale + centerX;
        const y = star.y * scale + centerY;
        const size = star.size * scale;

        // Only draw if on screen
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          // Brightness based on distance
          const brightness = (1 - star.z / 1000) * 255;
          ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness + 30}, ${Math.min(
            1,
            (1 - star.z / 1000) * 1.2
          )})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect for closer stars
          if (star.z < 500) {
            ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness + 50}, 0.3)`;
            ctx.lineWidth = size * 2;
            ctx.beginPath();
            ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{
        zIndex: 0,
        background: '#0C0C0C',
      }}
    />
  );
}
