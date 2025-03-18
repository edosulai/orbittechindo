"use client";

import { SignupFormData, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignupPage = () => {
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
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" {...register('name')} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
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
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" type="text" {...register('phone')} />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
