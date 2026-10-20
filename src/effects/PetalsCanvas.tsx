import { useEffect, useRef } from "react";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Petal = {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  driftPhase: number;
  driftSpeed: number;
  windInfluence: number;
  opacity: number;
  hue: number;
};

type Props = {
  count?: number;
  className?: string;
  interactive?: boolean;
};

/**
 * Hệ hạt cánh hoa bay: position, velocity, rotation, rotationSpeed, size, opacity,
 * lifetime (tái sinh ở trên khi rơi hết), và wind influence lệch pha từng cánh.
 * Khi `interactive`, cánh hoa gần con trỏ chuột sẽ bị đẩy nhẹ ra xung quanh.
 */
export default function PetalsCanvas({ count, className = "", interactive = true }: Props) {
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
    let petals: Petal[] = [];
    let rafId = 0;
    let visible = true;
    let windTime = 0;

    const total = count ?? (tier === "performance" ? 14 : 28);

    const makePetal = (randomY = true): Petal => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: Math.random() * 10 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      fallSpeed: Math.random() * 0.35 + 0.2,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.01 + 0.004,
      windInfluence: Math.random() * 0.6 + 0.4,
      opacity: Math.random() * 0.4 + 0.45,
      hue: Math.random() > 0.5 ? 335 : 300,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      petals = Array.from({ length: total }, () => makePetal(true));
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `hsla(${p.hue}, 85%, 82%, ${p.opacity})`;
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size / 2, p.size / 2, 0, p.size / 2);
      ctx.bezierCurveTo(-p.size / 2, p.size / 2, -p.size / 2, -p.size / 2, 0, -p.size / 2);
      ctx.fill();
      ctx.restore();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    const step = () => {
      if (!visible) {
        rafId = requestAnimationFrame(step);
        return;
      }
      windTime += 0.01;
      ctx.clearRect(0, 0, width, height);
      const windGust = Math.sin(windTime) * 0.6;

      for (const p of petals) {
        if (!reducedMotion) {
          p.y += p.fallSpeed;
          p.driftPhase += p.driftSpeed;
          p.x += Math.sin(p.driftPhase) * 0.6 + windGust * p.windInfluence;
          p.rotation += p.rotationSpeed;

          if (interactive) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              const force = (90 - dist) / 90;
              p.x += (dx / (dist || 1)) * force * 3;
              p.y += (dy / (dist || 1)) * force * 1.2;
            }
          }

          if (p.y > height + 20) {
            Object.assign(p, makePetal(false));
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;
        }
        drawPetal(p);
      }

      rafId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (interactive) window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive) window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [count, tier, reducedMotion, interactive]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
