'use client';

import { HTMLMotionProps } from 'framer-motion';
import React from 'react';

export interface ButtonProps extends HTMLMotionProps<'button'> {
    children: React.ReactNode;
    isLoading?: boolean;
}
