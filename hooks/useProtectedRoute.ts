import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

export function useProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const authIsLoading = useAuthStore((state) => state.isLoading);
    const logout = useAuthStore((state) => state.logout);
    const tractAuth = useAuthStore((state) => state.tractAuth);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            tractAuth();
        }
    }, [tractAuth]);

    return {
        isAuthenticated: isAuthenticated && typeof window !== 'undefined',
        authIsLoading,
        logout,
    };
}

export default useProtectedRoute;
