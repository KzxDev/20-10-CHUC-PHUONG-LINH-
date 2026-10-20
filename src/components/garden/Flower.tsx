import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FlowerProps = {
  left: string;
  bottom: string;
  scale: number;
  hue: number;
  delay: number;
  petalCount?: number;
  special?: boolean;
  onBloom?: () => void;
  onClick?: () => void;
};

/**
 * Một bông hoa trải qua đầy đủ vòng đời: SEED → SPROUT → LEAVES → BUD → BLOOM → GLOW → WIND.
 * Dựng bằng SVG + framer-motion, không dùng ảnh tĩnh.
 */
export default function Flower({
  left,
  bottom,
  scale,
  hue,
  delay,
  petalCount = 6,
  special = false,
  onBloom,
  onClick,
}: FlowerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [clicked, setClicked] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const windDuration = 4 + (hue % 5) * 0.4;
  const windDelay = (hue % 7) * 0.3;

  const petals = Array.from({ length: petalCount });

  return (
    <div
      ref={ref}
      className="absolute origin-bottom cursor-pointer select-none"
      style={{ left, bottom, transform: `scale(${scale})`, zIndex: Math.round(scale * 10) }}
      onClick={() => {
        setClicked(true);
        setShowMsg(true);
        onClick?.();
        window.setTimeout(() => setShowMsg(false), 2600);
      }}
    >
      {/* gentle continuous wind sway wrapper */}
      <motion.div
        animate={inView ? { rotate: [0, 2.5, -2, 0] } : {}}
        transition={{ duration: windDuration, repeat: Infinity, ease: "easeInOut", delay: windDelay }}
        className="origin-bottom"
      >
        <svg width="70" height="150" viewBox="0 0 70 150" className="overflow-visible">
          {/* PHASE 1 — SEED */}
          <motion.circle
            cx="35"
            cy="146"
            r="3"
            fill={`hsl(${hue}, 70%, 70%)`}
            initial={{ opacity: 1 }}
            animate={inView ? { opacity: 0 } : {}}
            transition={{ duration: 0.4, delay }}
          />

          {/* PHASE 2 — SPROUT (stem) */}
          <motion.path
            d="M35 146 C 33 110, 40 80, 35 40"
            stroke="#3f6b3f"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: delay + 0.2, ease: "easeOut" }}
          />

          {/* PHASE 3 — LEAVES */}
          <motion.path
            d="M35 100 C 15 95, 8 110, 10 122 C 25 120, 33 112, 35 100 Z"
            fill="#4d7a4d"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 1.1 }}
            style={{ transformOrigin: "35px 100px" }}
          />
          <motion.path
            d="M35 85 C 55 80, 62 93, 60 104 C 46 102, 37 95, 35 85 Z"
            fill="#5a8a5a"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 1.25 }}
            style={{ transformOrigin: "35px 85px" }}
          />

          {/* PHASE 4 — BUD */}
          <motion.circle
            cx="35"
            cy="40"
            r="6"
            fill={`hsl(${hue}, 60%, 55%)`}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 1.6 }}
          />

          {/* PHASE 5 — BLOOM (petals open in layers, staggered) */}
          <g transform="translate(35 38)">
            {petals.map((_, i) => {
              const angle = (360 / petals.length) * i;
              return (
                <motion.ellipse
                  key={i}
                  cx="0"
                  cy="-12"
                  rx="7"
                  ry="13"
                  fill={`hsl(${hue}, ${75 - (i % 2) * 10}%, ${78 - (i % 2) * 8}%)`}
                  initial={{ scale: 0, opacity: 0, rotate: angle }}
                  animate={
                    inView
                      ? {
                          scale: clicked ? [1, 1.25, 1] : 1,
                          opacity: 1,
                          rotate: angle,
                        }
                      : { scale: 0, opacity: 0, rotate: angle }
                  }
                  transition={{
                    duration: clicked ? 0.6 : 0.55,
                    delay: clicked ? 0 : delay + 2 + i * 0.09,
                    ease: "backOut",
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                  onAnimationComplete={() => {
                    if (i === petals.length - 1) onBloom?.();
                  }}
                />
              );
            })}
            {/* PHASE 6 — GLOW center */}
            <motion.circle
              r="6"
              fill={`hsl(${hue - 20}, 90%, 80%)`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 1, 0.75] } : {}}
              transition={{ duration: 1, delay: delay + 2.6 }}
            />
            {special && (
              <motion.circle
                r="16"
                fill="none"
                stroke="#FFE5AC"
                strokeWidth="1.2"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.6, 0], scale: [0.6, 2.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: delay + 3 }}
              />
            )}
          </g>

          {/* click ripple */}
          {clicked && (
            <motion.circle
              cx="35"
              cy="38"
              r="4"
              fill="none"
              stroke="#FF8EBB"
              strokeWidth="1.5"
              initial={{ opacity: 0.8, r: 4 }}
              animate={{ opacity: 0, r: 45 }}
              transition={{ duration: 1 }}
            />
          )}
        </svg>
      </motion.div>

      {showMsg && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -6 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute -top-2 left-1/2 w-36 -translate-x-1/2 rounded-lg bg-[#1a0d2e]/90 px-2 py-1.5 text-center text-[10px] leading-snug text-[#FFD4E5] shadow-lg"
        >
          {special ? "✨ Chồng Huân yêu em nhất" : "Linh xứng đáng với những điều dịu dàng nhất. 💗"}
        </motion.div>
      )}
    </div>
  );
}
