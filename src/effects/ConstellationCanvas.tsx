import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  size: number;
};

type Props = {
  className?: string;
  onFormed?: () => void;
};

function heartTargets(count: number, w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const scale = Math.min(w, h) / 32;
    pts.push({ x: w / 2 + x * scale, y: h / 2 + y * scale });
  }
  return pts;
}

/**
 * Các điểm sáng bay ngẫu nhiên, dần hội tụ thành hình trái tim với các đường nối mảnh.
 * Click để phân tách thành hạt rồi tái tạo lại.
 */
export default function ConstellationCanvas({ className = "", onFormed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const formedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let scatterT = 0;
    let isScattering = false;
    let visible = true;
    let progress = 0; // 0 = scattered random, 1 = fully formed heart

    const NODE_COUNT = reducedMotion ? 46 : 70;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targets = heartTargets(NODE_COUNT, width, height);
      nodes = targets.map((t) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        targetX: t.x,
        targetY: t.y,
        size: Math.random() * 1.6 + 1.2,
      }));
    };

    const onClick = () => {
      isScattering = true;
      scatterT = 0;
      progress = 0;
      formedRef.current = false;
      for (const n of nodes) {
        n.vx = (Math.random() - 0.5) * 6;
        n.vy = (Math.random() - 0.5) * 6;
      }
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    let startTime = performance.now();

    const step = (now: number) => {
      if (!visible) {
        rafId = requestAnimationFrame(step);
        return;
      }
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      if (isScattering) {
        scatterT += 1;
        if (scatterT > 50) {
          isScattering = false;
          startTime = now;
        }
      } else {
        progress = Math.min(1, elapsed / 7);
      }

      for (const n of nodes) {
        if (isScattering) {
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.96;
          n.vy *= 0.96;
        } else {
          const pull = 0.02 + progress * 0.03;
          n.x += (n.targetX - n.x) * pull * progress + (Math.random() - 0.5) * (1 - progress) * 1.2;
          n.y += (n.targetY - n.y) * pull * progress + (Math.random() - 0.5) * (1 - progress) * 1.2;
        }
      }

      // Draw connecting lines between nearby nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = progress > 0.9 ? 55 : 70;
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.45;
            ctx.strokeStyle = `rgba(255, 180, 210, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 5);
        glow.addColorStop(0, "rgba(255,230,245,0.9)");
        glow.addColorStop(1, "rgba(255,230,245,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (progress >= 1 && !formedRef.current) {
        formedRef.current = true;
        onFormed?.();
      }

      rafId = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("click", onClick);
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, onFormed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full cursor-pointer ${className}`}
      aria-hidden="true"
    />
  );
}
