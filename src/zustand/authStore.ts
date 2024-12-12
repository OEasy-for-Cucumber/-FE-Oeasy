import { User } from "@/types/authPropsTypes";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
  updateLastVoteTime: (time: number, type: "hate" | "like") => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isInitialized: false,
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  updateLastVoteTime: (time, type) =>
    set((state) => ({
      user: state.user ? { ...state.user, lastVoteTime: time, lastVoteType: type } : null
    }))
}));
