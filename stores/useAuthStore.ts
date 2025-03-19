import { AuthState } from '@/types';
import { verifyToken } from '@/utils';
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    isLoading: true,
    tractAuth: async () => {
        let isAuthenticated = false;

        const token = localStorage.getItem('token');  
        if (token) {
            isAuthenticated = await verifyToken(token)
        }

        set({ isLoading: false, isAuthenticated: isAuthenticated });
    },
    login: (token: string) => {
        localStorage.setItem('token', token);
    },
    logout: () => {
        localStorage.removeItem('token');
    },
}));
