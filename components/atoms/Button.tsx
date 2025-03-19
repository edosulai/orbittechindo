'use client';

import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export function Button({ ...rest }: ButtonProps) {
    return <button {...rest} />;
}
