'use client';

import { SignupFormData, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button, Input } from '../atoms';

export function SignupForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        try {
            console.log(data);
            // Handle form submission
            alert('Signup successful!');
            router.push('/login');
        } catch (error) {
            console.error('Signup failed', error);
            alert('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <View className="flex flex-col gap-4">
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.name && (
                <Text className="text-red-500">{errors.name.message}</Text>
            )}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
            )}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
            )}

            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Phone Number"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.phone && (
                <Text className="text-red-500">{errors.phone.message}</Text>
            )}

            <Button
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
                className="transition-transform transform hover:scale-105"
            >
                <Text>Signup</Text>
            </Button>
        </View>
    );
}
