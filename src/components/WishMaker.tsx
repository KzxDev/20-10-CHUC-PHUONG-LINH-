import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Trash2 } from "lucide-react";
import { WISH_MAKER } from "../config/loveConfig";

type Phase = "idle" | "flying" | "done";

export default function WishMaker() {
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [warning, setWarning] = useState(false);
  const starRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!value.trim()) {
      setWarning(true);
      window.setTimeout(() => setWarning(false), 2000);
      return;
    }
    setPhase("flying");
    window.setTimeout(() => setPhase("done"), 1800);
  };

  const reset = () => {
    setValue("");
    setPhase("idle");
  };

  return (
    <div className="relative mx-auto mt-20 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-9"
      >
        <h3 className="font-serif text-xl text-[#FFF8FC] sm:text-2xl">{WISH_MAKER.title}</h3>

        <div className="relative mt-6">
          <AnimatePresence mode="wait">
            {phase !== "done" ? (
              <motion.div key="form" exit={{ opacity: 0, scale: 0.9 }} className="space-y-4">
                <motion.div
                  ref={starRef}
                  animate={
                    phase === "flying"
                      ? { y: -260, scale: 0.2, opacity: 0, rotate: 15 }
                      : { y: 0, scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={WISH_MAKER.placeholder}
                    maxLength={240}
                    rows={3}
                    disabled={phase === "flying"}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white placeholder:text-white/30 focus:border-[#FF8EBB]/60 focus:outline-none"
                  />
                </motion.div>

                {warning && <p className="text-xs text-[#FFB6CE]">{WISH_MAKER.emptyWarning}</p>}

                <div className="flex justify-center gap-3">
                  <button
                    onClick={reset}
                    disabled={phase === "flying"}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-white/60 transition hover:border-white/30 disabled:opacity-40"
                  >
                    <Trash2 size={13} /> {WISH_MAKER.clearButton}
                  </button>
                  <button
                    onClick={send}
                    disabled={phase === "flying"}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#BBA4FF] px-5 py-2 text-xs font-medium text-[#1a0d2e] transition hover:scale-105 disabled:opacity-60"
                  >
                    <Send size={13} /> {WISH_MAKER.sendButton}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <span className="text-3xl">✨</span>
                <p className="max-w-xs font-serif text-base text-[#FFD4E5]">{WISH_MAKER.successMessage}</p>
                <button
                  onClick={reset}
                  className="mt-2 text-xs text-white/50 underline-offset-4 hover:underline"
                >
                  Gửi một điều ước khác
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-5 text-[11px] text-white/30">
          Điều ước của Linh chỉ hiển thị trong phiên này, không được gửi đi hay lưu lại ở bất cứ đâu.
        </p>
      </motion.div>
    </div>
  );
}
