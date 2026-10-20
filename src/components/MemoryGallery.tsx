import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { GALLERY_INTRO, GALLERY_PHOTOS, BACKGROUNDS, EASTER_EGGS } from "../config/loveConfig";
import { useEasterEggs } from "../context/EasterEggContext";

const ROTATIONS = [-4, 3, -2, 5, -5, 2, -3, 4];
const SPANS = ["sm:row-span-2", "", "", "sm:row-span-2", "", "", "sm:row-span-2", ""];

function PhotoFrame({ index }: { index: number }) {
  const photo = GALLERY_PHOTOS[index];
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden rounded-md bg-gradient-to-br from-[#2a1340] via-[#3a1f4d] to-[#1a0d2e]">
        {photo.src ? (
          <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full min-h-[140px] w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <Camera className="text-[#FFD4E5]/40" size={26} />
            <p className="text-[10px] leading-snug text-white/35">
              Thêm ảnh vào<br />
              <code className="text-[#FFD4E5]/50">public/photos/{photo.fileName}</code>
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="px-1 pb-1 pt-2">
        <p className="truncate text-xs text-[#2a1340]">{photo.caption}</p>
        <p className="text-[10px] text-[#2a1340]/50">#{String(photo.id).padStart(2, "0")} {photo.date ? `· ${photo.date}` : ""}</p>
      </div>
    </div>
  );
}

export default function MemoryGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [heartFound, setHeartFound] = useState(false);
  const { unlock, setActiveMessage } = useEasterEggs();

  const close = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length));
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_PHOTOS.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? GALLERY_PHOTOS[lightboxIndex] : null;

  return (
    <section
      id="memories"
      className="relative overflow-hidden bg-[#140a24] py-28 sm:py-36"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${BACKGROUNDS.gallerySpace})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#140a24]/60 via-[#140a24]/80 to-[#140a24]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl text-[#FFF8FC] sm:text-5xl">{GALLERY_INTRO.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:text-base">{GALLERY_INTRO.description}</p>
          <p className="mx-auto mt-3 max-w-lg text-xs text-white/35">{GALLERY_INTRO.helper}</p>
        </motion.div>

        <div className="relative mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[150px] sm:gap-5">
          {GALLERY_PHOTOS.map((photo, i) => (
            <motion.button
              key={photo.id}
              onClick={() => setLightboxIndex(i)}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative rounded-lg bg-[#FFF8FC] p-2 text-left shadow-[0_15px_35px_rgba(0,0,0,0.35)] ${SPANS[i % SPANS.length]}`}
            >
              <PhotoFrame index={i} />
            </motion.button>
          ))}

          {/* hidden heart easter egg on one of the frames */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              unlock("galleryHeart");
              setHeartFound(true);
              setActiveMessage(EASTER_EGGS.secretMessages.galleryHeart);
            }}
            aria-label="???"
            className="absolute -right-1 -top-1 z-20 flex h-7 w-7 items-center justify-center text-[#FF8EBB]/0 transition hover:text-[#FF8EBB]"
            style={{ left: "calc(37.5% - 14px)", top: "10px" }}
          >
            <Heart size={14} fill={heartFound ? "currentColor" : "none"} className={heartFound ? "text-[#FF8EBB]" : ""} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
            onClick={close}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX;
              if (delta > 60) prev();
              if (delta < -60) next();
              setTouchStartX(null);
            }}
          >
            <button onClick={close} aria-label="Đóng" className="absolute right-5 top-5 text-white/70 hover:text-white">
              <X size={26} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={activePhoto.id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm rounded-xl bg-[#FFF8FC] p-3 shadow-2xl sm:max-w-md"
            >
              <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-gradient-to-br from-[#2a1340] via-[#3a1f4d] to-[#1a0d2e]">
                {activePhoto.src ? (
                  <img src={activePhoto.src} alt={activePhoto.caption} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <Camera className="text-[#FFD4E5]/40" size={34} />
                    <p className="text-xs text-white/40">{activePhoto.fileName}</p>
                  </div>
                )}
              </div>
              <div className="px-1 pt-3">
                <p className="font-serif text-sm text-[#2a1340] sm:text-base">{activePhoto.caption}</p>
                <p className="mt-1 text-[11px] text-[#2a1340]/50">
                  #{String(activePhoto.id).padStart(2, "0")} / {GALLERY_PHOTOS.length} {activePhoto.date ? `· ${activePhoto.date}` : ""}
                </p>
              </div>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Ảnh sau"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
