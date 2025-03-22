import { AuthStore } from "@/types";
import { verifyToken } from "@/utils";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  tractAuth: async () => {
    let isAuthenticated = false;

    const token = localStorage.getItem("token");
    if (token) {
      isAuthenticated = await verifyToken(token);
    }

    set({ isLoading: false, isAuthenticated: isAuthenticated });
  },
  login: (token: string) => {
    localStorage.setItem("token", token);
    window.location.replace("/");
  },
  logout: () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  },
}));
