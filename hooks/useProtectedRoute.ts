import { useAuthStore } from '@/stores';

export function useProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const authIsLoading = useAuthStore((state) => state.isLoading);
    const tractAuth = useAuthStore((state) => state.tractAuth);

    if (typeof window !== 'undefined') {
        tractAuth();
    }

    return { isAuthenticated, authIsLoading };
}
