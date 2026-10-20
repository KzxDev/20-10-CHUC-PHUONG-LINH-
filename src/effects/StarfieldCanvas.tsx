import { useEffect, useRef } from "react";
import { useDeviceTier } from "../hooks/useDeviceTier";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  parallax: number;
};

type Props = {
  density?: number; // stars per 10000px^2
  className?: string;
  showShootingStars?: boolean;
  colorTint?: string;
};

/**
 * Nền bầu trời sao có twinkle, parallax theo chuột và (tùy chọn) sao băng ngẫu nhiên.
 * Tự động giảm số lượng sao trên thiết bị yếu / khi reduced-motion được bật.
 */
export default function StarfieldCanvas({
  density = 1,
  className = "",
  showShootingStars = false,
  colorTint = "255,255,255",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tier] = useDeviceTier();
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shootingStars: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];
    let rafId = 0;
    let visible = true;

    const densityFactor = (tier === "performance" ? 0.45 : 1) * density;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 10000) * densityFactor;
      stars = Array.from({ length: Math.max(20, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        parallax: Math.random() * 0.5 + 0.1,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const spawnShootingStar = () => {
      if (!showShootingStars || reducedMotion) return;
      const startX = Math.random() * width * 0.6 + width * 0.2;
      shootingStars.push({
        x: startX,
        y: Math.random() * height * 0.2,
        vx: -(Math.random() * 4 + 4),
        vy: Math.random() * 2 + 2,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    };

    let shootingTimer = window.setInterval(() => {
      if (Math.random() < 0.6) spawnShootingStar();
    }, 3500);

    let t = 0;
    const draw = () => {
      if (!visible) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.35 + 0.65;
        const alpha = Math.max(0, Math.min(1, s.baseAlpha * twinkle));
        const px = s.x + mouseRef.current.x * s.parallax * 14;
        const py = s.y + mouseRef.current.y * s.parallax * 14;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorTint},${alpha})`;
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      shootingStars = shootingStars.filter((star) => star.life < star.maxLife);
      for (const star of shootingStars) {
        star.life += 1;
        star.x += star.vx;
        star.y += star.vy;
        const alpha = 1 - star.life / star.maxLife;
        ctx.strokeStyle = `rgba(255,232,214,${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 4, star.y - star.vy * 4);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(shootingTimer);
      cancelAnimationFrame(rafId);
    };
  }, [tier, density, showShootingStars, reducedMotion, colorTint]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
