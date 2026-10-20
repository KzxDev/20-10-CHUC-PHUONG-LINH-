import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarfieldCanvas from "../effects/StarfieldCanvas";
import PetalsCanvas from "../effects/PetalsCanvas";
import { BACKGROUNDS, INTRO } from "../config/loveConfig";

type Stage = "idle" | "glow" | "crack" | "open" | "rise" | "burst" | "done";

export default function IntroEnvelope({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");

  const runSequence = () => {
    if (stage !== "idle") return;
    setStage("glow");
    window.setTimeout(() => setStage("crack"), 500);
    window.setTimeout(() => setStage("open"), 1150);
    window.setTimeout(() => setStage("rise"), 1950);
    window.setTimeout(() => setStage("burst"), 2650);
    window.setTimeout(() => {
      setStage("done");
      onComplete();
    }, 3700);
  };

  const sealParticles = Array.from({ length: 10 });
  const burstParticles = Array.from({ length: 36 });

  return (
    <motion.div
      className="fixed inset-0 z-[150] overflow-hidden bg-[#080D24]"
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${BACKGROUNDS.nebulaHeart})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/60 via-[#140a2a]/70 to-[#080D24]" />
      <StarfieldCanvas density={0.9} showShootingStars />
      <PetalsCanvas count={10} interactive={false} />

      {/* Skip button */}
      <AnimatePresence>
        {stage !== "done" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setStage("done");
              onComplete();
            }}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs tracking-wide text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:text-white sm:right-8 sm:top-8"
          >
            {INTRO.skipButton}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <AnimatePresence>
          {stage !== "rise" && stage !== "burst" && stage !== "done" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="mb-10 text-center"
            >
              <p className="font-serif text-xl text-[#FFF8FC] sm:text-2xl">{INTRO.envelopeLine1}</p>
              <p className="mt-2 font-serif text-lg text-[#FFD4E5] sm:text-xl">{INTRO.envelopeLine2}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope scene */}
        <div className="relative" style={{ perspective: "1200px" }}>
          <motion.div
            className="relative h-[170px] w-[260px] sm:h-[200px] sm:w-[320px]"
            animate={
              stage === "rise" || stage === "burst"
                ? { y: -40, opacity: 0, scale: 1.1 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* glow halo */}
            <motion.div
              className="absolute -inset-10 rounded-full bg-[#FF8EBB]/30 blur-3xl"
              animate={{
                opacity: stage === "idle" ? 0.25 : stage === "glow" ? 0.6 : 0.85,
                scale: stage === "idle" ? 1 : 1.2,
              }}
              transition={{ duration: 1 }}
            />

            {/* envelope body */}
            <div className="absolute inset-0 rounded-sm bg-gradient-to-b from-[#FFF8FC] to-[#FFD4E5] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 border border-[#FFE5AC]" />
            </div>

            {/* card that rises */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#FFF8FC] shadow-xl"
              style={{ transformOrigin: "bottom center" }}
              animate={
                stage === "rise" || stage === "burst"
                  ? { y: "-120%", rotate: -2, opacity: 1 }
                  : { y: "-6%", opacity: 0 }
              }
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
                <span className="text-2xl">💌</span>
                <p className="font-serif text-xs text-[#25113D]/70 sm:text-sm">Our Little Universe</p>
              </div>
            </motion.div>

            {/* envelope flap (top triangle) with 3D opening */}
            <motion.div
              className="absolute left-0 top-0 h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute left-0 top-0 h-0 w-0 origin-top"
                style={{
                  borderLeft: "130px solid transparent",
                  borderRight: "130px solid transparent",
                  borderTop: "95px solid #FFE1EE",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: stage === "open" || stage === "rise" || stage === "burst" ? 180 : 0,
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            </motion.div>

            {/* wax seal */}
            <AnimatePresence>
              {stage !== "open" && stage !== "rise" && stage !== "burst" && (
                <motion.button
                  aria-label="Mở phong thư"
                  onClick={runSequence}
                  initial={{ scale: 1 }}
                  animate={{
                    scale: stage === "crack" ? [1, 1.15, 0.9] : stage === "glow" ? 1.08 : 1,
                    boxShadow:
                      stage === "glow" || stage === "crack"
                        ? "0 0 35px rgba(255,142,187,0.9)"
                        : "0 0 12px rgba(255,142,187,0.5)",
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 top-[38%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#FF8EBB] to-[#C8457E] text-white sm:h-14 sm:w-14"
                >
                  <span className="text-lg sm:text-xl">♥</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* seal crack particles */}
            <AnimatePresence>
              {stage === "crack" &&
                sealParticles.map((_, i) => {
                  const angle = (i / sealParticles.length) * Math.PI * 2;
                  return (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-[38%] h-1.5 w-1.5 rounded-full bg-[#FFE5AC]"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * 60,
                        y: Math.sin(angle) * 60 - 20,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
            </AnimatePresence>
          </motion.div>

          {/* final burst */}
          <AnimatePresence>
            {stage === "burst" &&
              burstParticles.map((_, i) => {
                const angle = (i / burstParticles.length) * Math.PI * 2;
                const dist = 220 + Math.random() * 180;
                return (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#FFF8FC]"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: 0,
                      scale: 1.5,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                );
              })}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {(stage === "idle" || stage === "glow") && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              onClick={runSequence}
              className="mt-12 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#BBA4FF] px-8 py-3 text-sm font-medium tracking-wide text-[#1a0d2e] shadow-[0_10px_40px_rgba(255,142,187,0.4)] transition"
            >
              {INTRO.openButton}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "burst" && (
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-[14%] text-center font-serif text-2xl text-[#FFF8FC] sm:text-4xl"
            >
              {INTRO.revealTitle}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
