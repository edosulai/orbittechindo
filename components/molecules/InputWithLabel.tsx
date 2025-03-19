'use client';

import { Input, InputProps, Label } from '../atoms';

interface InputWithLabelProps extends InputProps {
    label: string;
    children?: React.ReactNode;
}

export function InputWithLabel({
    label,
    children,
    name,
    ...rest
}: InputWithLabelProps) {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={name}
                {...rest}
            />
            {children}
        </div>
    );
}
