'use client';

import { SignupFormData, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '../atoms';
import { InputWithLabel } from '../molecules';

export function SignupForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithLabel
                label="Name"
                {...register('name')}
            >
                {errors.name && <p>{errors.name.message}</p>}
            </InputWithLabel>
            <InputWithLabel
                label="Email"
                {...register('email')}
            >
                {errors.email && <p>{errors.email.message}</p>}
            </InputWithLabel>
            <InputWithLabel
                label="Password"
                {...register('password')}
            >
                {errors.password && <p>{errors.password.message}</p>}
            </InputWithLabel>
            <InputWithLabel
                label="Phone Number"
                {...register('phone')}
            >
                {errors.phone && <p>{errors.phone.message}</p>}
            </InputWithLabel>
            <Button type='submit'>Signup</Button>
        </form>
    );
}
