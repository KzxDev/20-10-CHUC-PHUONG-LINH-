import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Gift as GiftIcon, Sparkles, X } from "lucide-react";
import { COMPLIMENTS, GIFT_ROOM, WISHES_FOR_HER, BACKGROUNDS } from "../config/loveConfig";

type Stage = "closed" | "shaking" | "open";

export default function GiftRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [stage, setStage] = useState<Stage>("closed");
  const [activeGift, setActiveGift] = useState<string | null>(null);
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [wishIdx, setWishIdx] = useState(0);

  const openBox = () => {
    if (stage !== "closed") return;
    setStage("shaking");
    window.setTimeout(() => setStage("open"), 700);
  };

  const openGift = (id: string) => {
    if (id === "compliment") setComplimentIdx(Math.floor(Math.random() * COMPLIMENTS.length));
    if (id === "wish") setWishIdx(Math.floor(Math.random() * WISHES_FOR_HER.length));
    if (id === "album") {
      document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setActiveGift(id);
  };

  const particles = Array.from({ length: 16 });

  return (
    <section
      id="gift"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#140b28] py-28 sm:py-36"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${BACKGROUNDS.giftRoom})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140b28]/60 via-[#140b28]/75 to-[#140b28]" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl text-[#FFF8FC] sm:text-5xl"
        >
          {GIFT_ROOM.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-3 max-w-md text-sm text-white/60"
        >
          {GIFT_ROOM.description}
        </motion.p>

        <div className="relative mx-auto mt-16 flex h-56 items-center justify-center">
          {/* gift box */}
          {stage !== "open" && inView && (
            <motion.button
              onClick={openBox}
              aria-label={GIFT_ROOM.openPrompt}
              animate={
                stage === "shaking"
                  ? { rotate: [0, -4, 4, -3, 3, 0], x: [0, -3, 3, -2, 2, 0] }
                  : { y: [0, -6, 0] }
              }
              transition={stage === "shaking" ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity }}
              className="relative"
            >
              <div className="relative h-28 w-32 rounded-sm bg-gradient-to-b from-[#FF8EBB] to-[#C8457E] shadow-[0_20px_45px_rgba(255,142,187,0.35)] sm:h-32 sm:w-36">
                <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-[#FFE5AC]" />
                <div className="absolute left-0 top-1/2 h-4 w-full -translate-y-1/2 bg-[#FFE5AC]" />
                <div className="absolute -top-5 left-1/2 h-7 w-10 -translate-x-1/2 rounded-full border-4 border-[#FFE5AC]" />
              </div>
              <p className="mt-4 text-xs text-white/50">{GIFT_ROOM.openPrompt}</p>
            </motion.button>
          )}

          <AnimatePresence>
            {stage === "open" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="absolute h-40 w-40 rounded-full bg-[#FFE5AC]/30 blur-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                {particles.map((_, i) => {
                  const angle = (i / particles.length) * Math.PI * 2;
                  return (
                    <motion.span
                      key={i}
                      className="absolute h-1.5 w-1.5 rounded-full bg-[#FFE5AC]"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: Math.cos(angle) * 120, y: Math.sin(angle) * 120 - 60, opacity: 0 }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                    />
                  );
                })}
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative h-24 w-28 rounded-sm bg-gradient-to-b from-[#FF8EBB] to-[#C8457E] shadow-xl sm:h-28 sm:w-32"
                >
                  <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 bg-[#FFE5AC]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {stage === "open" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-6 grid gap-4 sm:grid-cols-3"
            >
              {GIFT_ROOM.gifts.map((gift, i) => (
                <motion.button
                  key={gift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                  onClick={() => openGift(gift.id)}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md transition hover:border-[#FF8EBB]/40 hover:bg-white/[0.07]"
                >
                  <GiftIcon className="text-[#FFD4E5] transition group-hover:scale-110" size={22} />
                  <p className="text-xs font-medium tracking-wide text-white/80">{gift.title}</p>
                  <p className="text-[11px] text-white/45">{gift.description}</p>
                  <span className="mt-1 text-[11px] text-[#FF8EBB]">{gift.buttonLabel} →</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGift(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm rounded-2xl border border-white/10 bg-gradient-to-b from-[#2a1340] to-[#1a0d2e] p-7 text-center shadow-2xl"
            >
              <button
                onClick={() => setActiveGift(null)}
                className="absolute right-4 top-4 text-white/50 hover:text-white"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
              <Sparkles className="mx-auto mb-3 text-[#FFE5AC]" size={24} />
              <p className="font-serif text-lg leading-relaxed text-[#FFF8FC]">
                {activeGift === "compliment" ? COMPLIMENTS[complimentIdx] : WISHES_FOR_HER[wishIdx]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
