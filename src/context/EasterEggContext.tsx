import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type SecretId = "gardenFlowers" | "moon" | "star" | "envelopeSeal" | "galleryHeart";

const ALL_SECRETS: SecretId[] = ["gardenFlowers", "moon", "star", "envelopeSeal", "galleryHeart"];

type EasterEggContextValue = {
  found: Set<SecretId>;
  unlock: (id: SecretId) => void;
  total: number;
  foundCount: number;
  allFound: boolean;
  showUnlockedModal: boolean;
  dismissUnlockedModal: () => void;
  activeMessage: string | null;
  setActiveMessage: (msg: string | null) => void;
};

const EasterEggContext = createContext<EasterEggContextValue | null>(null);

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<SecretId>>(new Set());
  const [showUnlockedModal, setShowUnlockedModal] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [celebratedAll, setCelebratedAll] = useState(false);

  const unlock = useCallback(
    (id: SecretId) => {
      setFound((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        if (next.size === ALL_SECRETS.length && !celebratedAll) {
          setCelebratedAll(true);
          window.setTimeout(() => setShowUnlockedModal(true), 900);
        }
        return next;
      });
    },
    [celebratedAll]
  );

  const value = useMemo<EasterEggContextValue>(
    () => ({
      found,
      unlock,
      total: ALL_SECRETS.length,
      foundCount: found.size,
      allFound: found.size === ALL_SECRETS.length,
      showUnlockedModal,
      dismissUnlockedModal: () => setShowUnlockedModal(false),
      activeMessage,
      setActiveMessage,
    }),
    [found, unlock, showUnlockedModal, activeMessage]
  );

  return <EasterEggContext.Provider value={value}>{children}</EasterEggContext.Provider>;
}

export function useEasterEggs() {
  const ctx = useContext(EasterEggContext);
  if (!ctx) throw new Error("useEasterEggs must be used within EasterEggProvider");
  return ctx;
}
