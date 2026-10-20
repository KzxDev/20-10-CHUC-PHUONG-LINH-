import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEasterEggs } from "../context/EasterEggContext";

/** Hiển thị thông điệp bí mật khi người dùng mở khóa một easter egg — không dùng alert() mặc định. */
export default function SecretMessageToast() {
  const { activeMessage, setActiveMessage } = useEasterEggs();

  return (
    <AnimatePresence>
      {activeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-4 bottom-20 z-[130] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-[#FFE5AC]/30 bg-[#1a0d2e]/95 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:bottom-8"
        >
          <Sparkles className="mt-0.5 shrink-0 text-[#FFE5AC]" size={18} />
          <p className="flex-1 text-sm leading-relaxed text-[#FFF8FC]">{activeMessage}</p>
          <button
            onClick={() => setActiveMessage(null)}
            aria-label="Đóng"
            className="shrink-0 text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
