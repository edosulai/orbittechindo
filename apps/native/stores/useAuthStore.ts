import { AuthStore } from "@/types";
import { Storage, verifyToken } from "@/utils";
import { router } from "expo-router";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  tractAuth:  async() => {
    let isAuthenticated = false;

    const token = await Storage.getItem("token");
    if (token) {
      isAuthenticated = verifyToken(token);
    }

    set({ isLoading: false, isAuthenticated: isAuthenticated });
  },
  login: async (token: string) => {
    await Storage.setItem("token", token);
    set({ isAuthenticated: true });
    router.replace("/");
  },
  logout: async () => {
    await Storage.deleteItemAsync("token");
    set({ isAuthenticated: false });
    router.replace("/login");
  },
}));
