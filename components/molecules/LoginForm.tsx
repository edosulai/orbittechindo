'use client';

import { MOCK_USER } from '@/consts';
import { LoginFormData, loginSchema } from '@/schemas';
import { useAuthStore } from '@/stores';
import { generateToken } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../atoms';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (data: LoginFormData) => {
        if (
            data.email === MOCK_USER.email &&
            data.password === MOCK_USER.password
        ) {
            generateToken(data.email)
                .then((token) => {
                    login(token);
                    router.replace('/');
                })
                .catch((error) => {
                    console.error('Token generation failed', error);
                    alert('An error occurred. Please try again.');
                });
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="Username"
                value={MOCK_USER.email}
                {...register('email')}
            />
            {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
                type="password"
                placeholder="Password"
                value={MOCK_USER.password}
                {...register('password')}
            />
            {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button type="submit">Login</Button>
        </form>
    );
}
