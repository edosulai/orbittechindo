'use client';

import { Footer, SignupForm } from '@/components';
import { useProtectedRoute } from '@/hooks';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function SignupScreen() {
    const router = useRouter();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();

    if (!authIsLoading && isAuthenticated) {
        router.replace('/');
    }

    return (
        <View className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16">
            <View className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Text className="text-2xl sm:text-3xl font-bold">Sign Up</Text>
                <SignupForm />
            </View>
            <Footer />
        </View>
    );
}
