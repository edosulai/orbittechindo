import { AuthStore } from "@/types";
import { verifyToken } from "@/utils";
import { Router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  tractAuth: async () => {
    let isAuthenticated = false;

    const token = await SecureStore.getItemAsync("token");
    if (token) {
      isAuthenticated = await verifyToken(token);
    }

    set({ isLoading: false, isAuthenticated: isAuthenticated });
  },
  login: async (token: string, router: Router) => {
    await SecureStore.setItemAsync("token", token);
    router.replace("/");
  },
  logout: async (router: Router) => {
    await SecureStore.deleteItemAsync("token");
    router.replace("/login");
  },
}));
