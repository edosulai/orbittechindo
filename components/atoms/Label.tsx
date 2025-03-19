'use client';

import React, { LabelHTMLAttributes, DetailedHTMLProps } from 'react';

export function Label({
    children,
    ...rest
}: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>) {
    return <label {...rest}>{children}</label>;
}
