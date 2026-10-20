import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { LOVE_LETTER, BACKGROUNDS } from "../config/loveConfig";
import PetalsCanvas from "../effects/PetalsCanvas";

export default function LoveLetter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [playKey, setPlayKey] = useState(0);
  const [hugs, setHugs] = useState<number[]>([]);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (inView) setPlayKey(1);
  }, [inView]);

  const totalParts = LOVE_LETTER.paragraphs.length;

  useEffect(() => {
    if (playKey === 0) return;
    setGlow(false);
    const timer = window.setTimeout(() => setGlow(true), totalParts * 450 + 1600);
    return () => window.clearTimeout(timer);
  }, [playKey, totalParts]);

  const replay = () => setPlayKey((k) => k + 1);

  const sendHug = () => {
    setHugs((h) => [...h, Date.now()]);
    window.setTimeout(() => setHugs((h) => h.slice(1)), 2200);
  };

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1c1230] py-28 sm:py-36"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${BACKGROUNDS.lakeGardenMoon})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1230]/70 via-[#1c1230]/85 to-[#1c1230]" />
      <PetalsCanvas count={10} interactive={false} />

      <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <span className="text-2xl">🖋️</span>
          <h2 className="mt-3 font-serif text-3xl text-[#FFF8FC] sm:text-4xl">{LOVE_LETTER.title}</h2>
        </motion.div>

        <motion.div
          key={playKey}
          initial={{ y: 60, opacity: 0, rotate: -1 }}
          animate={playKey ? { y: 0, opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-sm bg-[#FFF8ED] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-12"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, rgba(37,17,61,0.06) 32px)",
          }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-sm"
            animate={{ boxShadow: glow ? "inset 0 0 90px rgba(255,142,187,0.25)" : "inset 0 0 0 rgba(255,142,187,0)" }}
            transition={{ duration: 1.5 }}
          />

          <div className="space-y-4 font-serif text-[15px] leading-relaxed text-[#2a1340] sm:text-base">
            {LOVE_LETTER.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={playKey ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.45 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={playKey ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 + totalParts * 0.45 + 0.6 }}
            className="mt-8 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-[#2a1340]/70">{LOVE_LETTER.signatureLine1}</p>
              <p
                className="mt-1 text-3xl text-[#8a2a55]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {LOVE_LETTER.signatureLine2}
              </p>
            </div>
            <motion.svg
              width="54"
              height="48"
              viewBox="0 0 32 29"
              className="text-[#FF8EBB]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={playKey ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5 + totalParts * 0.45 + 1 }}
            >
              <motion.path
                d="M16 28S1 18.5 1 9.5C1 4.3 5.1 1 9.4 1c3 0 5.3 1.7 6.6 4.1C17.3 2.7 19.6 1 22.6 1 26.9 1 31 4.3 31 9.5 31 18.5 16 28 16 28Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </motion.svg>
          </motion.div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={replay}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/75 backdrop-blur-sm transition hover:border-[#BBA4FF]/50 hover:text-white"
          >
            <RotateCcw size={14} /> {LOVE_LETTER.rereadButton}
          </button>
          <button
            onClick={sendHug}
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#BBA4FF] px-5 py-2.5 text-sm font-medium text-[#1a0d2e] shadow-lg transition hover:scale-105"
          >
            <Heart size={14} /> {LOVE_LETTER.hugButton}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {hugs.map((id) => (
          <motion.div
            key={id}
            className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="absolute h-24 w-24 rounded-full border-2 border-[#FF8EBB]/60"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                initial={{ y: 0, x: (i - 4) * 14, opacity: 1, scale: 0.8 }}
                animate={{ y: -160 - Math.random() * 60, opacity: 0, scale: 1.2 }}
                transition={{ duration: 1.8, delay: i * 0.05, ease: "easeOut" }}
              >
                💗
              </motion.span>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
