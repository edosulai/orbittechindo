'use client';

import React, { LabelHTMLAttributes, DetailedHTMLProps } from 'react';

export type LabelProps = DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>;

export function Label({ className, ...props }: LabelProps) {
    return (
        <label
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
            {...props}
        />
    );
}
