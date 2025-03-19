export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    tractAuth: () => void;
    login: (token: string) => void;
    logout: () => void;
}