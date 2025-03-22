'use client';

import { MotionProps } from 'framer-motion';
import { TouchableWithoutFeedbackProps } from 'react-native';

type CombinedProps = Omit<MotionProps, 'style'> & Omit<TouchableWithoutFeedbackProps, 'style'>;

export interface ButtonProps extends CombinedProps {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}
