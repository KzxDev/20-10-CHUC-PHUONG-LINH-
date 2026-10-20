import { motion } from "framer-motion";

export default function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#080D24]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[#FF8EBB] border-r-[#BBA4FF] opacity-80" />
        <span className="text-2xl">💗</span>
      </div>
      <p className="mt-6 font-serif text-sm tracking-[0.35em] text-[#FFD4E5]/80">OUR LITTLE UNIVERSE</p>
      <div className="mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF8EBB] via-[#BBA4FF] to-[#FFE5AC] transition-all duration-200"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </motion.div>
  );
}
