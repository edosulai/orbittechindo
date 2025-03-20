'use client';

import { SignupFormData, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../atoms';

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
            <Input type="text" placeholder="Username" {...register('name')} />
            {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input type="email" placeholder="Email" {...register('email')} />
            {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
                type="password"
                placeholder="Password"
                {...register('password')}
            />
            {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
            )}
            <Input
                type="text"
                placeholder="Phone Number"
                {...register('phone')}
            />
            {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
            )}
            <Button type="submit">Signup</Button>
        </form>
    );
}
