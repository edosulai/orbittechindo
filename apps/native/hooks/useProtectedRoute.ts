import { useAuthStore } from "@/stores";
import { useEffect } from "react";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export function useProtectedRoute() {
  const {
    isAuthenticated,
    isLoading: authIsLoading,
    logout,
    tractAuth,
  } = useAuthStore();

  useEffect(() => {
    tractAuth();
  }, [tractAuth]);

  return {
    isAuthenticated: isWeb
      ? isAuthenticated && typeof window !== "undefined"
      : isAuthenticated,
    authIsLoading,
    logout,
  };
}
