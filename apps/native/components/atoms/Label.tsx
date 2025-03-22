"use client";

import { LabelProps } from "@/types";
import { Text } from "react-native";

export function Label({ className, ...props }: LabelProps) {
  return (
    <Text
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    />
  );
}
