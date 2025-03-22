import { AuthStore } from "@/types";
import { verifyToken } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  tractAuth: async () => {
    let isAuthenticated = false;

    const token = await AsyncStorage.getItem("token");
    if (token) {
      isAuthenticated = await verifyToken(token);
    }

    set({ isLoading: false, isAuthenticated: isAuthenticated });
  },
  login: async (token: string) => {
    await AsyncStorage.setItem("token", token);
    useRouter().replace("/");
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    useRouter().replace("/login");
  },
}));
