'use client';

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>

export function Input({
    ...rest
}: InputProps) {
    return <input {...rest} />;
}
