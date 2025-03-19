'use client';

import React, { LabelHTMLAttributes, DetailedHTMLProps } from 'react';

export type LabelProps = DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>;

export function Label({ ...rest }: LabelProps) {
    return <label {...rest} />;
}
