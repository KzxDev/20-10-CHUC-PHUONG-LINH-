import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANNIVERSARY_DATE, ANNIVERSARY_FALLBACK_LABEL } from "../config/loveConfig";
import { getDurationBreakdown } from "../utils/time";

const UNITS: { key: keyof ReturnType<typeof getDurationBreakdown>; label: string }[] = [
  { key: "years", label: "Năm" },
  { key: "months", label: "Tháng" },
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
];

function DigitBox({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-inner backdrop-blur-md sm:h-20 sm:w-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF8EBB]/70 to-transparent" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-serif text-2xl text-[#FFF8FC] sm:text-3xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">{label}</span>
    </div>
  );
}

export default function AnniversaryCounter() {
  const hasDate = Boolean(ANNIVERSARY_DATE);
  const [breakdown, setBreakdown] = useState(() =>
    hasDate ? getDurationBreakdown(new Date(ANNIVERSARY_DATE as string), new Date()) : null
  );

  useEffect(() => {
    if (!hasDate) return;
    const start = new Date(ANNIVERSARY_DATE as string);
    const tick = () => setBreakdown(getDurationBreakdown(start, new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [hasDate]);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_20px_60px_rgba(37,17,61,0.45)] backdrop-blur-xl sm:p-8">
      {hasDate && breakdown ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {UNITS.map((u) => (
            <DigitBox key={u.key} value={breakdown[u.key]} label={u.label} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <span className="font-serif text-3xl text-[#FFF8FC] sm:text-4xl">{ANNIVERSARY_FALLBACK_LABEL}</span>
          <p className="max-w-sm text-xs text-white/45 sm:text-sm">
            (Anh Yêu Em 💗)
          </p>
        </div>
      )}
    </div>
  );
}
