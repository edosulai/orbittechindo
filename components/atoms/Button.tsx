'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    isLoading?: boolean;
}

export function Button({
    className,
    isLoading,
    children,
    ...props
}: ButtonProps) {
    return (
        <motion.button
            className={`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto ${className}`}
            {...props}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            {isLoading && (
                <motion.div
                    className="w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: 'linear',
                    }}
                />
            )}
        </motion.button>
    );
}
