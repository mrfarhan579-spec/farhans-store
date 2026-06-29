'use client';
import { useEffect, useRef, useState } from 'react';

interface CloudIntroProps {
  onComplete: () => void;
}

export default function CloudIntro({ onComplete }: CloudIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'intro' | 'done'>('intro');
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxOrNull = canvas.getContext('2d');
    if (!ctxOrNull) return;
    const ctx: CanvasRenderingContext2D = ctxOrNull;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width;
    const H = canvas.height;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ─── Particles ────────────────────────────────────────────────
    const goldColors = [
      'rgba(201,168,76,', 'rgba(232,201,122,',
      'rgba(160,120,48,', 'rgba(245,220,150,',
    ];
    const cloudColors = [
      'rgba(255,255,255,', 'rgba(240,230,200,', 'rgba(220,200,160,',
    ];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        life: Math.random(),
      });
    }

    // ─── Clouds ──────────────────────────────────────────────────
    interface Cloud {
      x: number; y: number; rx: number; ry: number;
      opacity: number; color: string; vx: number; blur: number;
    }

    const clouds: Cloud[] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const dist = Math.random() * Math.min(W, H) * 0.45;
      clouds.push({
        x: W / 2 + Math.cos(angle) * dist * (0.5 + Math.random() * 0.5),
        y: H / 2 + Math.sin(angle) * dist * 0.4,
        rx: Math.random() * 220 + 80,
        ry: Math.random() * 110 + 40,
        opacity: Math.random() * 0.55 + 0.2,
        color: cloudColors[Math.floor(Math.random() * cloudColors.length)],
        vx: (Math.random() - 0.5) * 0.15,
        blur: Math.random() * 60 + 20,
      });
    }

    startTimeRef.current = performance.now();

    // ─── Draw functions ───────────────────────────────────────────
    function drawCloud(c: Cloud, alpha: number) {
      ctx.save();
      ctx.globalAlpha = c.opacity * alpha;
      ctx.filter = `blur(${c.blur}px)`;
      const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.rx);
      grad.addColorStop(0, c.color + '0.9)');
      grad.addColorStop(0.5, c.color + '0.4)');
      grad.addColorStop(1, c.color + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawText(progress: number) {
      const titleSize = Math.min(W * 0.12, 100);
      ctx.save();
      ctx.globalAlpha = progress;
      ctx.filter = `blur(${(1 - progress) * 12}px)`;
      ctx.shadowColor = 'rgba(201,168,76,0.8)';
      ctx.shadowBlur = 40 * progress;

      // Gold gradient
      const grad = ctx.createLinearGradient(W / 2 - 300, 0, W / 2 + 300, 0);
      grad.addColorStop(0, '#A07830');
      grad.addColorStop(0.3, '#C9A84C');
      grad.addColorStop(0.5, '#E8C97A');
      grad.addColorStop(0.7, '#C9A84C');
      grad.addColorStop(1, '#A07830');

      ctx.font = `300 ${titleSize}px Cormorant, Georgia, serif`;
      ctx.fillStyle = grad;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("FARHAN'S", W / 2, H / 2 - titleSize * 0.55);

      ctx.font = `italic 300 ${titleSize * 0.85}px Cormorant, Georgia, serif`;
      ctx.fillStyle = 'rgba(245,240,232,0.95)';
      ctx.shadowColor = 'rgba(201,168,76,0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText('STORE', W / 2, H / 2 + titleSize * 0.3);

      ctx.filter = 'none';
      ctx.shadowBlur = 0;
      ctx.font = `300 ${Math.min(W * 0.013, 13)}px Jost, sans-serif`;
      ctx.fillStyle = `rgba(201,168,76,${0.6 * progress})`;
      ctx.fillText('WHERE LUXURY MEETS PERFECTION', W / 2, H / 2 + titleSize * 0.85);

      // Decorative lines
      const lineW = 160 * progress;
      const lineY1 = H / 2 - titleSize * 0.95;
      const lineY2 = H / 2 + titleSize * 1.15;
      ctx.globalAlpha = 0.4 * progress;
      ctx.strokeStyle = 'rgba(201,168,76,0.6)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(W / 2 - lineW, lineY1);
      ctx.lineTo(W / 2 + lineW, lineY1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W / 2 - lineW, lineY2);
      ctx.lineTo(W / 2 + lineW, lineY2);
      ctx.stroke();

      ctx.restore();
    }

    function drawLight(t: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.25;
      const rayGrad = ctx.createLinearGradient(W / 2, 0, W / 2, H * 0.8);
      rayGrad.addColorStop(0, 'rgba(201,168,76,0.8)');
      rayGrad.addColorStop(0.5, 'rgba(201,168,76,0.2)');
      rayGrad.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.filter = `blur(${60 + Math.sin(t * 0.5) * 10}px)`;
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 40, 0);
      ctx.lineTo(W / 2 + 40, 0);
      ctx.lineTo(W / 2 + 200, H * 0.75);
      ctx.lineTo(W / 2 - 200, H * 0.75);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawParticles(t: number, alpha: number) {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;
        const pulse = 0.5 + 0.5 * Math.sin(p.life * 3 + t);
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.opacity * alpha * pulse;
        ctx.fillStyle = p.color + '1)';
        ctx.shadowColor = p.color + '0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    // ─── Animation loop ───────────────────────────────────────────
    function animate(now: number) {
      const elapsed = (now - startTimeRef.current) / 1000;

      ctx.clearRect(0, 0, W, H);

      // Background
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
      bgGrad.addColorStop(0, '#1A1610');
      bgGrad.addColorStop(0.5, '#0F0D09');
      bgGrad.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      let cloudAlpha = 1;
      let textProgress = 0;
      let lightAlpha = 0;

      if (elapsed < 1.5) {
        cloudAlpha = elapsed / 1.5;
      } else if (elapsed < 4) {
        const t = (elapsed - 1.5) / 2.5;
        textProgress = Math.min(1, t * 1.2);
        cloudAlpha = Math.max(0.15, 1 - t * 0.7);
        lightAlpha = t;
      } else if (elapsed < 5.5) {
        textProgress = 1;
        cloudAlpha = Math.max(0, 0.3 - (elapsed - 4) * 0.3);
        lightAlpha = Math.max(0, 1 - (elapsed - 4) * 0.5);
      } else if (elapsed < 6.8) {
        const t = (elapsed - 5.5) / 1.3;
        const a = 1 - t;
        drawLight(elapsed, 0);
        clouds.forEach(c => { c.x += c.vx; drawCloud(c, 0); });
        drawParticles(elapsed, a);
        drawText(a);
        ctx.fillStyle = `rgba(10,10,10,${t})`;
        ctx.fillRect(0, 0, W, H);
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      } else {
        setPhase('done');
        setTimeout(onComplete, 200);
        return;
      }

      drawLight(elapsed, lightAlpha);
      clouds.forEach(c => {
        c.x += c.vx;
        if (c.x > W + c.rx) c.x = -c.rx;
        if (c.x < -c.rx) c.x = W + c.rx;
        drawCloud(c, cloudAlpha);
      });
      drawParticles(elapsed, cloudAlpha);
      if (textProgress > 0) drawText(textProgress);

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#0A0A0A' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <button
        onClick={() => { setPhase('done'); onComplete(); }}
        style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          background: 'none', border: '1px solid rgba(201,168,76,0.3)',
          color: 'rgba(201,168,76,0.5)', fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          padding: '0.5rem 1.2rem', borderRadius: '20px', cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.7)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(201,168,76,0.9)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.3)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(201,168,76,0.5)';
        }}
      >
        Skip Intro
      </button>
    </div>
  );
}
