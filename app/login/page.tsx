'use client';

import { Footer, LoginForm } from '@/components';
import { useProtectedRoute } from '@/hooks';

function LoginPage() {
    const { isAuthenticated, authIsLoading } = useProtectedRoute();

    if (!authIsLoading && isAuthenticated) {
        window.location.replace('/');
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <h1 className="text-2xl font-bold">Login</h1>
                <LoginForm />
            </main>
            <Footer />
        </div>
    );
}

export default LoginPage;
