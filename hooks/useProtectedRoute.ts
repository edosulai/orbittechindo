import { useAuthStore } from '@/stores';
import { verifyToken } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export const useProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const { data: authStatus } = useQuery({
        queryKey: ['authStatus', isAuthenticated],
        queryFn: async () => {
            const token = localStorage.getItem('token');  
            if (!token) {
                return false;
            } 
            
            return await verifyToken(token)
        }
    });

    return { isAuthenticated: authStatus };
};
