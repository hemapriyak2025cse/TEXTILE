import React, { useEffect, useRef, useState } from 'react';

interface TextileThreadFlowProps {
  className?: string;
  replayKey?: number | string;
}

export const TextileThreadFlow: React.FC<TextileThreadFlowProps> = ({ className = '', replayKey = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [internalKey, setInternalKey] = useState<number>(0);

  // Replay on browser back-forward navigation cache
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setInternalKey(prev => prev + 1);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = performance.now();
    let isReducedMotion = false;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isReducedMotion = true;
    }

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating micro-filament yarn particles
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 900,
      len: 12 + Math.random() * 24,
      angle: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      drift: 0.002 + Math.random() * 0.005,
      alpha: 0.2 + Math.random() * 0.45,
      color: Math.random() > 0.4 ? '#C6A15B' : '#38BDF8'
    }));

    // Main animation render loop
    const render = (now: number) => {
      if (!canvas || !ctx) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) / 1000;
      // Weaving entrance sequence completes over 2.6 seconds
      const weaveProgress = isReducedMotion ? 1 : Math.min(1, elapsed / 2.6);
      // Continuous ambient textile wave time
      const t = isReducedMotion ? 0 : elapsed;

      // 1. Deep Atmospheric Gradient with Fabric Texture
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#0E172E');
      bgGrad.addColorStop(0.5, '#0A1128');
      bgGrad.addColorStop(1, '#060A17');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Floating Textile Filaments
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(now * p.drift + p.y * 0.01) * 0.4;
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha * weaveProgress;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const px2 = p.x + Math.cos(p.angle) * p.len;
        const py2 = p.y + Math.sin(p.angle) * p.len;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(px2, py2);
        ctx.stroke();
        ctx.restore();
      });

      // 3. Dimensional Interwoven Warp and Weft Fabric Grid
      // Calculate responsive spacing based on canvas dimensions
      const warpCols = Math.max(18, Math.floor(width / 48));
      const weftRows = Math.max(14, Math.floor(height / 48));
      const colStep = width / (warpCols + 1);
      const rowStep = height / (weftRows + 1);

      // Fabric wave function: creates subtle 3D billowing motion
      const waveOffset = (x: number, y: number) => {
        const w1 = Math.sin(x * 0.004 + y * 0.003 + t * 0.9) * 14;
        const w2 = Math.cos(x * 0.005 - y * 0.004 + t * 0.7) * 10;
        return (w1 + w2) * weaveProgress;
      };

      // PASS A: Render Base Weft Threads (Horizontal)
      for (let r = 1; r <= weftRows; r++) {
        const baseY = r * rowStep;
        // Staggered reveal per row according to weaveProgress
        const rowDelay = (r / weftRows) * 0.6;
        const rowProgress = Math.min(1, Math.max(0, (weaveProgress - rowDelay) / 0.4));
        if (rowProgress <= 0) continue;

        ctx.save();
        ctx.beginPath();

        const strandXMax = width * rowProgress;
        for (let x = 0; x <= strandXMax; x += 12) {
          const y = baseY + waveOffset(x, baseY);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Color variation: alternation between champagne gold and textile cyan
        const isAccentRow = r % 4 === 0;
        ctx.strokeStyle = isAccentRow
          ? 'rgba(56, 189, 248, 0.45)'
          : r % 2 === 0
          ? 'rgba(198, 161, 91, 0.38)'
          : 'rgba(230, 213, 173, 0.28)';
        ctx.lineWidth = isAccentRow ? 1.6 : 1.1;
        ctx.stroke();
        ctx.restore();
      }

      // PASS B: Render Warp Threads (Vertical)
      for (let c = 1; c <= warpCols; c++) {
        const baseX = c * colStep;
        const colDelay = (c / warpCols) * 0.6;
        const colProgress = Math.min(1, Math.max(0, (weaveProgress - colDelay) / 0.4));
        if (colProgress <= 0) continue;

        ctx.save();
        ctx.beginPath();

        const strandYMax = height * colProgress;
        for (let y = 0; y <= strandYMax; y += 12) {
          const x = baseX + waveOffset(baseX, y);
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const isAccentCol = c % 4 === 0;
        ctx.strokeStyle = isAccentCol
          ? 'rgba(198, 161, 91, 0.5)'
          : c % 2 === 0
          ? 'rgba(230, 213, 173, 0.35)'
          : 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = isAccentCol ? 1.6 : 1.1;
        ctx.stroke();
        ctx.restore();
      }

      // PASS C: Authentic Over-and-Under Thread Interlacing (Cross-nodes with Micro-shadows)
      for (let r = 1; r <= weftRows; r += 2) {
        const baseY = r * rowStep;
        for (let c = 1; c <= warpCols; c += 2) {
          const baseX = c * colStep;
          const x = baseX + waveOffset(baseX, baseY);
          const y = baseY + waveOffset(baseX, baseY);

          // Weave intersection logic: alternate which thread goes over
          const warpOver = (r + c) % 2 === 0;

          if (warpOver) {
            // Draw warp over weft node with micro-shadow
            ctx.save();
            ctx.fillStyle = '#E6D5AD';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 1.5;
            ctx.fillRect(x - 1, y - 5, 2, 10);
            ctx.restore();
          } else {
            // Draw weft over warp node
            ctx.save();
            ctx.fillStyle = '#C6A15B';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1.5;
            ctx.fillRect(x - 5, y - 1, 10, 2);
            ctx.restore();
          }
        }
      }

      // 4. Feature Flowing Sinuous Accent Yarn Strands (Curving Silk/Thread Ribbons)
      const ribbons = [
        {
          amp: 90,
          freq: 0.0028,
          speed: 1.1,
          yCenter: height * 0.32,
          color: 'rgba(198, 161, 91, 0.75)',
          glow: 'rgba(198, 161, 91, 0.4)',
          width: 2.2
        },
        {
          amp: 110,
          freq: 0.0022,
          speed: -0.9,
          yCenter: height * 0.68,
          color: 'rgba(56, 189, 248, 0.7)',
          glow: 'rgba(56, 189, 248, 0.4)',
          width: 2
        },
        {
          amp: 70,
          freq: 0.0035,
          speed: 1.4,
          yCenter: height * 0.5,
          color: 'rgba(230, 213, 173, 0.85)',
          glow: 'rgba(230, 213, 173, 0.5)',
          width: 2.5
        }
      ];

      ribbons.forEach((rib, rIdx) => {
        ctx.save();
        ctx.beginPath();
        const ribbonLength = width * Math.min(1, weaveProgress * 1.2);

        for (let x = 0; x <= ribbonLength; x += 8) {
          const wave = Math.sin(x * rib.freq + t * rib.speed + rIdx) * rib.amp;
          const secondary = Math.cos(x * rib.freq * 2.2 - t * 0.5) * (rib.amp * 0.35);
          const y = rib.yCenter + wave + secondary;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = rib.color;
        ctx.lineWidth = rib.width;
        ctx.shadowColor = rib.glow;
        ctx.shadowBlur = 12;
        ctx.stroke();

        // 5. Active Loom Shuttles / Traveling Specular Highlights along the strand
        const highlightPhase = (t * 0.25 + rIdx * 0.33) % 1;
        const shuttleX = highlightPhase * ribbonLength;
        const shuttleY =
          rib.yCenter +
          Math.sin(shuttleX * rib.freq + t * rib.speed + rIdx) * rib.amp +
          Math.cos(shuttleX * rib.freq * 2.2 - t * 0.5) * (rib.amp * 0.35);

        // Glowing traveling shuttle bead
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(shuttleX, shuttleY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Secondary trailing halo
        ctx.fillStyle = rib.color;
        ctx.beginPath();
        ctx.arc(shuttleX, shuttleY, 7, 0, Math.PI * 2);
        ctx.globalAlpha = 0.45;
        ctx.fill();
        ctx.restore();
      });

      // 6. Geometric Jacquard Center Rosette Outline (Reflects smart pattern drafting)
      ctx.save();
      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const rosetteRadius = Math.min(width, height) * 0.32;
      const rosetteProgress = Math.max(0, (weaveProgress - 0.4) / 0.6);

      if (rosetteProgress > 0) {
        ctx.strokeStyle = 'rgba(198, 161, 91, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);

        // Outer concentric tension circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, rosetteRadius * rosetteProgress, 0, Math.PI * 2);
        ctx.stroke();

        // Inner diamond weave ring
        ctx.beginPath();
        const dSize = rosetteRadius * 0.6 * rosetteProgress;
        ctx.moveTo(centerX, centerY - dSize);
        ctx.lineTo(centerX + dSize, centerY);
        ctx.lineTo(centerX, centerY + dSize);
        ctx.lineTo(centerX - dSize, centerY);
        ctx.closePath();
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [replayKey, internalKey]);

  return (
    <div
      className={`position-absolute top-0 start-0 w-100 h-100 overflow-hidden ${className}`}
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-100 h-100 position-absolute top-0 start-0"
        style={{ display: 'block' }}
      />
    </div>
  );
};
