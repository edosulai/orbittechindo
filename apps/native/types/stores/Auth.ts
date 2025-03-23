import { Router } from "expo-router";

export interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  tractAuth: () => void;
  login: (token: string, router: Router) => void;
  logout: (router: Router) => void;
}
