'use client';

import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export function Button({
    children,
    ...rest
}: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) {
    return <button {...rest}>{children}</button>;
}
