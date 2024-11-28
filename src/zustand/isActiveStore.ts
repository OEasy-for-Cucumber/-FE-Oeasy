import { create } from "zustand";

interface ActiveState {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const useActiveStore = create<ActiveState>((set) => ({
  isActive: false,
  setIsActive: (isActive) => set({ isActive })
}));
