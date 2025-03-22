'use client';

import { SelectProps } from '@/types';
import { cssInterop } from 'nativewind';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

export function Select({ className, ...props }: SelectProps) {
    const NewRNPickerSelect = cssInterop(
        ({ style, ...props }: PickerSelectProps) => {
            return <RNPickerSelect style={style} {...props} />;
        },
        {
            className: 'style',
        },
    );

    return (
        <NewRNPickerSelect
            className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full ${className}`}
            {...props}
        />
    );
}
