'use client';
import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      life: number; speed: number;
      color: string;
    }

    const colors = [
      'rgba(201,168,76,', 'rgba(232,201,122,',
      'rgba(160,120,48,', 'rgba(245,220,150,',
      'rgba(255,255,255,',
    ];

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.004,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY;

      particles.forEach(p => {
        p.life += p.speed;
        p.x += p.vx + Math.sin(p.life * 0.5) * 0.15;
        p.y += p.vy;

        // Parallax with scroll
        const parallaxY = p.y - scrollY * 0.1;

        // Reset if out of view
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }

        const pulse = 0.5 + 0.5 * Math.sin(p.life * 2);
        const alpha = p.opacity * pulse;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow
        ctx.shadowColor = p.color + '0.8)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color + '1)';

        ctx.beginPath();
        ctx.arc(p.x, parallaxY, p.size * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
