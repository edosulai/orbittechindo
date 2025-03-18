import { AuthState } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ isAuthenticated: true });
    },
    logout: (router: AppRouterInstance) => {
        localStorage.removeItem('token');
        set({ isAuthenticated: false });
        router.push('/login');
    },
}));
