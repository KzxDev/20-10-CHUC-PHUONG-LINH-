import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { AUDIO } from "../config/loveConfig";

/**
 * Điều khiển nhạc nền tùy chọn. Không tự động phát khi chưa có tương tác.
 * Nếu file audio không tồn tại, nút sẽ hiển thị trạng thái "không khả dụng" một cách êm ái.
 */
export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(AUDIO.backgroundMusicSrc);
    audio.loop = true;
    audio.volume = AUDIO.defaultVolume;
    audio.addEventListener("error", () => setAvailable(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(
        () => setPlaying(true),
        () => setAvailable(false)
      );
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Tắt nhạc nền" : "Bật nhạc nền"}
      title={available ? (playing ? "Tắt nhạc nền" : "Bật nhạc nền") : "Chưa có file nhạc — xem hướng dẫn trong loveConfig.ts"}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FFD4E5] backdrop-blur-md transition hover:border-[#FF8EBB]/50 hover:bg-white/10"
    >
      {playing && available ? (
        <Music size={17} className="animate-pulse" />
      ) : (
        <VolumeX size={17} className={available ? "" : "opacity-40"} />
      )}
    </button>
  );
}
