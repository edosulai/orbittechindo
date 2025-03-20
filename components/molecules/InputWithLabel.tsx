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
        <div className="flex flex-col gap-2">
            <Label className="font-semibold" htmlFor={name}>
                {label}
            </Label>
            <Input
                className="border border-gray-300 rounded px-2 py-1"
                id={name}
                type={name}
                {...rest}
            />
            {children}
        </div>
    );
}
