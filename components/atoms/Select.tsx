'use client';

import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export type SelectProps = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>;

export function Select({ ...rest }: SelectProps) {
    return <select {...rest} />;
}
