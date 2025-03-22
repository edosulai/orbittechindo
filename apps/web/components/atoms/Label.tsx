"use client";

import { LabelProps } from "@/types";

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    />
  );
}
