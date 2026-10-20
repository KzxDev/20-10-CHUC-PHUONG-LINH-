import { motion } from "framer-motion";
import StarfieldCanvas from "../effects/StarfieldCanvas";
import PetalsCanvas from "../effects/PetalsCanvas";
import { BACKGROUNDS, HER_NICKNAME } from "../config/loveConfig";
import { useEasterEggs } from "../context/EasterEggContext";

export default function Finale() {
  const { foundCount, total } = useEasterEggs();

  return (
    <footer className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-[#070314] px-6 py-24 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${BACKGROUNDS.endingGateStars})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070314]/60 via-[#070314]/70 to-[#070314]" />
      <StarfieldCanvas density={0.7} showShootingStars />
      <PetalsCanvas count={12} interactive={false} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="text-3xl">💗</span>
        <h2 className="mt-5 font-serif text-2xl text-[#FFF8FC] sm:text-4xl">
          Cảm ơn Linh vì đã đọc đến tận đây.
        </h2>
        <p className="mt-4 max-w-md text-sm text-white/55 sm:text-base">
          Mong rằng chúng mình sẽ còn viết thêm thật nhiều trang đẹp nữa, {HER_NICKNAME}. Chúc Linh 20/10 thật hạnh phúc.
        </p>

        <div className="mt-8 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-white/50 backdrop-blur-sm">
          ✨ Bí mật đã tìm thấy: {foundCount}/{total}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-8 rounded-full bg-gradient-to-r from-[#FF8EBB] to-[#BBA4FF] px-7 py-2.5 text-sm font-medium text-[#1a0d2e] transition hover:scale-105"
        >
          Quay lại từ đầu ↑
        </button>

        <p className="mt-12 text-[11px] tracking-wide text-white/25">
          made with 💗 — Vũ trụ nhỏ của chúng ta – 2 năm bên nhau
        </p>
      </motion.div>
    </footer>
  );
}
