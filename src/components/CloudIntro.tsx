'use client';
import { useEffect, useRef, useState } from 'react';

interface CloudIntroProps {
  onComplete: () => void;
}

export default function CloudIntro({ onComplete }: CloudIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'clouds' | 'text-emerge' | 'fade-out' | 'done'>('clouds');
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ─── Particles ───────────────────────────────────────────────
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number;
    }> = [];

    const goldColors = ['rgba(201,168,76,', 'rgba(232,201,122,', 'rgba(160,120,48,', 'rgba(245,220,150,'];
    const cloudColors = ['rgba(255,255,255,', 'rgba(240,230,200,', 'rgba(220,200,160,'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        life: Math.random(),
      });
    }

    // ─── Cloud puffs ─────────────────────────────────────────────
    const clouds: Array<{
      x: number; y: number; rx: number; ry: number;
      opacity: number; color: string; vx: number; blur: number;
    }> = [];

    const W = canvas.width;
    const H = canvas.height;

    // Center cluster of clouds
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

    // ─── Draw helpers ─────────────────────────────────────────────
    function drawCloud(c: typeof clouds[0], globalAlpha: number) {
      ctx.save();
      ctx.globalAlpha = c.opacity * globalAlpha;
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

    function drawGoldText(progress: number, cloudAlpha: number) {
      // Main title
      const titleSize = Math.min(W * 0.12, 100);
      ctx.save();
      ctx.globalAlpha = progress;
      ctx.filter = `blur(${(1 - progress) * 12}px)`;

      // Gold glow
      ctx.shadowColor = 'rgba(201,168,76,0.8)';
      ctx.shadowBlur = 40 * progress;

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

      // STORE - italic
      ctx.font = `italic 300 ${titleSize * 0.85}px Cormorant, Georgia, serif`;
      ctx.fillStyle = 'rgba(245,240,232,0.95)';
      ctx.shadowColor = 'rgba(201,168,76,0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText('STORE', W / 2, H / 2 + titleSize * 0.3);

      // Tagline
      ctx.filter = 'none';
      ctx.shadowBlur = 0;
      ctx.font = `300 ${Math.min(W * 0.014, 14)}px Jost, sans-serif`;
      ctx.letterSpacing = '0.4em';
      ctx.fillStyle = `rgba(201,168,76,${0.6 * progress})`;
      ctx.fillText('WHERE LUXURY MEETS PERFECTION', W / 2, H / 2 + titleSize * 0.85);

      // Horizontal lines
      const lineY1 = H / 2 - titleSize * 0.95;
      const lineY2 = H / 2 + titleSize * 1.15;
      const lineW = 160 * progress;
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

    function drawVolumetricLight(t: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha * 0.25;
      // Ray from top center
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

    // ─── Main animation loop ──────────────────────────────────────
    let currentPhase = 'clouds';
    let fadeOutStart = 0;

    function animate(now: number) {
      const elapsed = (now - startTimeRef.current) / 1000; // seconds

      ctx.clearRect(0, 0, W, H);

      // BG
      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.8);
      bgGrad.addColorStop(0, '#1A1610');
      bgGrad.addColorStop(0.5, '#0F0D09');
      bgGrad.addColorStop(1, '#0A0A0A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Phase timing
      // 0-1.5s: clouds build
      // 1.5-3.5s: clouds part + text emerges
      // 3.5-5.5s: text fully visible, clouds fade
      // 5.5-6.5s: fade out to black
      // 6.5s: done

      let cloudAlpha = 1;
      let textProgress = 0;
      let volumetricAlpha = 0;

      if (elapsed < 1.5) {
        // Clouds building
        cloudAlpha = elapsed / 1.5;
        volumetricAlpha = 0;
        currentPhase = 'clouds';
      } else if (elapsed < 4) {
        // Text emerges through clouds
        const t = (elapsed - 1.5) / 2.5;
        textProgress = Math.min(1, t * 1.2);
        cloudAlpha = Math.max(0.15, 1 - t * 0.7);
        volumetricAlpha = t;
        currentPhase = 'text-emerge';
      } else if (elapsed < 5.5) {
        // Full reveal
        textProgress = 1;
        cloudAlpha = Math.max(0, 0.3 - (elapsed - 4) * 0.3);
        volumetricAlpha = Math.max(0, 1 - (elapsed - 4) * 0.5);
        currentPhase = 'text-emerge';
      } else if (elapsed < 6.8) {
        // Fade to black
        const t = (elapsed - 5.5) / 1.3;
        const screenAlpha = 1 - t;
        textProgress = screenAlpha;
        cloudAlpha = 0;
        volumetricAlpha = 0;
        currentPhase = 'fade-out';

        // Draw everything then overlay black
        drawVolumetricLight(elapsed, volumetricAlpha);
        clouds.forEach(c => { c.x += c.vx; drawCloud(c, cloudAlpha); });
        drawParticles(elapsed, screenAlpha);
        drawGoldText(screenAlpha, 0);

        ctx.fillStyle = `rgba(10,10,10,${t})`;
        ctx.fillRect(0, 0, W, H);
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      } else {
        // Done
        if (currentPhase !== 'done') {
          currentPhase = 'done';
          setPhase('done');
          setTimeout(onComplete, 200);
        }
        return;
      }

      // Draw volumetric light
      drawVolumetricLight(elapsed, volumetricAlpha);

      // Draw clouds (move slowly)
      clouds.forEach(c => {
        c.x += c.vx;
        if (c.x > W + c.rx) c.x = -c.rx;
        if (c.x < -c.rx) c.x = W + c.rx;
        drawCloud(c, cloudAlpha);
      });

      // Draw particles
      drawParticles(elapsed, cloudAlpha);

      // Draw text
      if (textProgress > 0) {
        drawGoldText(textProgress, cloudAlpha);
      }

      animFrameRef.current = requestAnimationFrame(animate);
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

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      background: '#0A0A0A',
    }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />

      {/* Skip button */}
      <button
        onClick={() => { setPhase('done'); onComplete(); }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          background: 'none',
          border: '1px solid rgba(201,168,76,0.3)',
          color: 'rgba(201,168,76,0.5)',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          padding: '0.5rem 1.2rem',
          borderRadius: '20px',
          cursor: 'pointer',
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
