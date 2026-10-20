import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
};

export type FireworksHandle = {
  burstHeart: () => void;
  burstRandom: (count?: number) => void;
};

const HEART_POINTS = (() => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 90; i++) {
    const t = (i / 90) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push({ x, y });
  }
  return pts;
})();

const FireworksCanvas = forwardRef<FireworksHandle, { className?: string }>(({ className = "" }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    const step = () => {
      if (!visible) {
        rafId = requestAnimationFrame(step);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      sparksRef.current = sparksRef.current.filter((s) => s.life < s.maxLife);
      for (const s of sparksRef.current) {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.025;
        s.vx *= 0.985;
        s.vy *= 0.985;
        const alpha = Math.max(0, 1 - s.life / s.maxLife);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${s.hue}, 95%, 75%, ${alpha})`;
        ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      rafId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    burstRandom(count = 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const hues = [335, 300, 45, 265, 190];
      for (let b = 0; b < count; b++) {
        const cx = w * (0.2 + Math.random() * 0.6);
        const cy = h * (0.15 + Math.random() * 0.35);
        const hue = hues[Math.floor(Math.random() * hues.length)];
        const sparkCount = reducedMotion ? 26 : 60;
        for (let i = 0; i < sparkCount; i++) {
          const angle = (i / sparkCount) * Math.PI * 2;
          const speed = Math.random() * 3.2 + 1.5;
          sparksRef.current.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 55 + Math.random() * 30,
            hue: hue + Math.random() * 20 - 10,
            size: Math.random() * 2 + 1.4,
          });
        }
      }
    },
    burstHeart() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h * 0.38;
      const scale = Math.min(w, h) / 24;
      const points = reducedMotion ? HEART_POINTS.filter((_, i) => i % 2 === 0) : HEART_POINTS;
      for (const pt of points) {
        const targetX = cx + pt.x * scale;
        const targetY = cy + pt.y * scale;
        const dx = targetX - cx;
        const dy = targetY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = dist / 34;
        sparksRef.current.push({
          x: cx,
          y: cy,
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          life: 0,
          maxLife: 70 + Math.random() * 15,
          hue: 335 + Math.random() * 15,
          size: Math.random() * 2.2 + 1.8,
        });
      }
    },
  }));

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
});

FireworksCanvas.displayName = "FireworksCanvas";
export default FireworksCanvas;
