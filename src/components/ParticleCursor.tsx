'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Trail particles
    interface TrailParticle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; color: string;
    }

    const trail: TrailParticle[] = [];

    // Ambient particles that react to cursor
    interface AmbientParticle {
      x: number; y: number;
      ox: number; oy: number; // original position
      vx: number; vy: number;
      size: number; opacity: number;
      color: string;
    }

    const ambient: AmbientParticle[] = [];
    const goldColors = ['#C9A84C', '#E8C97A', '#A07830', '#F0D88A'];

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ambient.push({
        x, y, ox: x, oy: y,
        vx: 0, vy: 0,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.05,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }

    let frame = 0;
    let animId: number;

    function spawnTrail() {
      const spread = 3;
      for (let i = 0; i < 2; i++) {
        trail.push({
          x: cursorX + (Math.random() - 0.5) * spread,
          y: cursorY + (Math.random() - 0.5) * spread,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          life: 1,
          maxLife: 40 + Math.random() * 30,
          size: Math.random() * 2.5 + 0.5,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      // Spawn trail particles
      if (frame % 2 === 0) spawnTrail();

      // Draw & update ambient particles (react to cursor)
      ambient.forEach(p => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 120;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          p.vx += (dx / dist) * force * 2.5;
          p.vy += (dy / dist) * force * 2.5;
        }

        // Spring back to original position
        p.vx += (p.ox - p.x) * 0.04;
        p.vy += (p.oy - p.y) * 0.04;

        // Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        const pulse = 0.5 + 0.5 * Math.sin(frame * 0.02 + p.ox * 0.01);

        ctx.save();
        ctx.globalAlpha = p.opacity * pulse;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw & update trail particles
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.01; // slight float up
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        ctx.save();
        ctx.globalAlpha = lifeRatio * 0.8;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10 * lifeRatio;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw main cursor dot
      const t = frame * 0.05;
      const pulseSize = 5 + Math.sin(t) * 1.5;

      // Outer ring
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#C9A84C';
      ctx.lineWidth = 1;
      ctx.shadowColor = '#C9A84C';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 18 + Math.sin(t * 0.7) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Inner glow dot
      const dotGrad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, pulseSize * 2);
      dotGrad.addColorStop(0, '#E8C97A');
      dotGrad.addColorStop(0.5, '#C9A84C');
      dotGrad.addColorStop(1, 'rgba(201,168,76,0)');

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = dotGrad;
      ctx.shadowColor = '#C9A84C';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, pulseSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99997,
        mixBlendMode: 'screen',
      }}
    />
  );
}
