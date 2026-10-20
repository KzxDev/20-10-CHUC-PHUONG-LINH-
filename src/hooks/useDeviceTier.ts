import { useEffect, useState } from "react";

export type DeviceTier = "high" | "performance";

/**
 * Tự động phát hiện khả năng thiết bị (dựa trên số nhân CPU, bộ nhớ, kích thước màn hình)
 * để chọn giữa chế độ HIGH QUALITY và PERFORMANCE MODE.
 */
export function useDeviceTier(): [DeviceTier, (tier: DeviceTier) => void] {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    try {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const cores = navigator.hardwareConcurrency || 4;
      const memory = nav.deviceMemory || 4;
      const isSmallScreen = window.innerWidth < 820;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      if (cores <= 4 || memory <= 4 || (isSmallScreen && isCoarsePointer)) {
        setTier("performance");
      } else {
        setTier("high");
      }
    } catch {
      setTier("performance");
    }
  }, []);

  return [tier, setTier];
}
