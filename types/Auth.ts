import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface AuthState {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: (router: AppRouterInstance) => void;
}