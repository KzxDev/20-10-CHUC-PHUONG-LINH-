import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ConstellationCanvas from "../effects/ConstellationCanvas";
import { CONSTELLATION, EASTER_EGGS } from "../config/loveConfig";
import { useEasterEggs } from "../context/EasterEggContext";

export default function LoveConstellation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [formed, setFormed] = useState(false);
  const [specialFound, setSpecialFound] = useState(false);
  const { unlock, setActiveMessage } = useEasterEggs();

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#080D24]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2a1340_0%,_#0b0620_60%,_#080D24_100%)]" />
      {inView && <ConstellationCanvas onFormed={() => setFormed(true)} />}

      {/* Hidden special star easter egg */}
      <button
        onClick={() => {
          unlock("star");
          setSpecialFound(true);
          setActiveMessage(EASTER_EGGS.secretMessages.star);
        }}
        aria-label="???"
        className="absolute left-[18%] top-[22%] h-6 w-6 rounded-full opacity-0 sm:left-[22%] sm:top-[28%]"
        title="✨"
      />
      {specialFound && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute left-[18%] top-[22%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE5AC] shadow-[0_0_14px_6px_rgba(255,229,172,0.6)] sm:left-[22%] sm:top-[28%]"
        />
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={formed ? { opacity: 1, letterSpacing: "0.45em" } : {}}
          transition={{ duration: 1.4 }}
          className="font-serif text-3xl text-[#FFF8FC] drop-shadow-[0_0_25px_rgba(255,142,187,0.6)] sm:text-5xl"
        >
          {CONSTELLATION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={formed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-4 max-w-md text-sm italic text-white/60 sm:text-base"
        >
          {CONSTELLATION.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={formed ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-6 text-xs tracking-wide text-white/35"
        >
          Iu chạm vào thử đi xem trái tim ngưng tụ lại , anh làm siuu đẳng cấp  ✨
        </motion.p>
      </div>
    </section>
  );
}
