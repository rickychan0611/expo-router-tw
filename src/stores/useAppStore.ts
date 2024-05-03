import { StateDays } from "@/interfaces/productTypes";
import { create } from "zustand";

type AppState = {
  count: number;
  themeKey: string;
  triggerThemeKey: () => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  statsFilter: StateDays;
  setStatsFilter: (filter: StateDays) => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  themeKey: "light",
  triggerThemeKey: () => set((state) => ({ themeKey: state.themeKey === "light" ? "dark" : "light" })),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  statsFilter: "Yesterday",
  setStatsFilter: (filter) => set({ statsFilter: filter }),
}));
