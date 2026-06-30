'use client';
import { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 20 particles instead of 80 — 4x less CPU
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.05,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.25 + 0.05,
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.003,
    }));

    let animId: number;
    let frame = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      frame++;
      // Draw every 2nd frame (30fps) — halves GPU/CPU usage
      if (frame % 2 !== 0) return;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        p.life += p.speed;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas!.height + 10;
          p.x = Math.random() * canvas!.width;
        }

        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.life));
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = 'rgba(201,168,76,1)';
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
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
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.45 }}
    />
  );
}
