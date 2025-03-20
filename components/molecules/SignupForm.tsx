'use client';

import { SignupFormData, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '../atoms';
import { InputWithLabel } from '.';

export function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });
    const router = useRouter();

    const onSubmit = (data: SignupFormData) => {
        console.log(data);
        // Handle form submission
        alert('Signup successful!');
        router.push('/login');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <InputWithLabel label="Name" {...register('name')}>
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}
            </InputWithLabel>
            <InputWithLabel label="Email" {...register('email')}>
                {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                )}
            </InputWithLabel>
            <InputWithLabel label="Password" {...register('password')}>
                {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                )}
            </InputWithLabel>
            <InputWithLabel label="Phone Number" {...register('phone')}>
                {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                )}
            </InputWithLabel>
            <Button
                type="submit"
                className="bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
                Signup
            </Button>
        </form>
    );
}
