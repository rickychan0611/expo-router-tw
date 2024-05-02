import { create } from "zustand";

type AppState = {
  count: number;
  themeKey: number;
  triggerThemeKey: () => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  themeKey: 0,
  triggerThemeKey: () => set((state) => ({ themeKey: state.themeKey + 1 })),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
