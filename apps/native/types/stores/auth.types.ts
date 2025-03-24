import { Router } from "expo-router";

export interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  tractAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}
