import { useEffect, useRef } from "react";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Firefly = {
  x: number;
  y: number;
  baseY: number;
  phase: number;
  speed: number;
  blinkPhase: number;
  blinkSpeed: number;
  trailTimer: number;
  trail: { x: number; y: number }[];
};

/** Đom đóm nhấp nháy chu kỳ không đều, thỉnh thoảng để lại vệt sáng cong ngắn rồi tan biến. */
export default function FireflyCanvas({ count, className = "" }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tier] = useDeviceTier();
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let flies: Firefly[] = [];
    let rafId = 0;
    let visible = true;
    const total = count ?? (tier === "performance" ? 10 : 22);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flies = Array.from({ length: total }, () => ({
        x: Math.random() * width,
        y: height * (0.35 + Math.random() * 0.6),
        baseY: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.4 + 0.15,
        blinkPhase: Math.random() * Math.PI * 2,
        blinkSpeed: Math.random() * 0.03 + 0.01,
        trailTimer: Math.random() * 400,
        trail: [],
      }));
      flies.forEach((f) => (f.baseY = f.y));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    let t = 0;
    const step = () => {
      if (!visible) {
        rafId = requestAnimationFrame(step);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, width, height);

      for (const f of flies) {
        if (!reducedMotion) {
          f.phase += f.speed * 0.02;
          f.x += Math.sin(f.phase) * 0.5;
          f.y = f.baseY + Math.cos(f.phase * 0.7) * 18;
          f.blinkPhase += f.blinkSpeed;

          const dx = f.x - mouseRef.current.x;
          const dy = f.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            f.x += (dx / (dist || 1)) * 1.2;
            f.y += (dy / (dist || 1)) * 1.2;
          }

          if (f.x < 0) f.x = width;
          if (f.x > width) f.x = 0;

          f.trailTimer -= 1;
          if (f.trailTimer <= 0 && Math.random() < 0.004) {
            f.trail = [{ x: f.x, y: f.y }];
            f.trailTimer = 300 + Math.random() * 300;
          }
          if (f.trail.length > 0 && f.trail.length < 14) {
            f.trail.push({ x: f.x, y: f.y });
          } else if (f.trail.length >= 14) {
            f.trail.shift();
          }
        }

        const blink = Math.max(0, Math.sin(f.blinkPhase)) ** 2;
        const alpha = 0.25 + blink * 0.75;

        if (f.trail.length > 1) {
          ctx.strokeStyle = `rgba(255,229,172,${0.25 * alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          f.trail.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
          ctx.stroke();
        }

        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 7);
        glow.addColorStop(0, `rgba(255,229,172,${alpha})`);
        glow.addColorStop(1, "rgba(255,229,172,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,248,230,${alpha})`;
        ctx.arc(f.x, f.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, [count, tier, reducedMotion]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
