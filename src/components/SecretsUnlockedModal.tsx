import { AnimatePresence, motion } from "framer-motion";
import { EASTER_EGGS } from "../config/loveConfig";
import { useEasterEggs } from "../context/EasterEggContext";

export default function SecretsUnlockedModal() {
  const { showUnlockedModal, dismissUnlockedModal } = useEasterEggs();

  return (
    <AnimatePresence>
      {showUnlockedModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/85 px-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-md rounded-[28px] border border-[#FFE5AC]/30 bg-gradient-to-b from-[#2a1340] to-[#120820] p-9 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            <motion.div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8EBB] to-[#BBA4FF] text-2xl shadow-[0_0_40px_rgba(255,142,187,0.6)]"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💗
            </motion.div>
            <h3 className="font-serif text-2xl text-[#FFF8FC]">{EASTER_EGGS.unlockedTitle}</h3>
            <p className="mt-3 text-sm text-white/60">{EASTER_EGGS.unlockedSubtitle}</p>
            <button
              onClick={dismissUnlockedModal}
              className="mt-7 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#BBA4FF] px-7 py-2.5 text-sm font-medium text-[#1a0d2e] transition hover:scale-105"
            >
              {EASTER_EGGS.backButton}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
