"use client";

import { MOCK_USER } from '@/consts';
import { LoginFormData, loginSchema } from '@/schemas';
import { useAuthStore } from '@/stores';
import { generateToken } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const onSubmit = (data: LoginFormData) => {
        if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
            generateToken(data.email).then((token) => {
                login(token);
                router.push('/');
            }).catch((error) => {
                console.error('Token generation failed', error);
                alert('An error occurred. Please try again.');
            });
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
