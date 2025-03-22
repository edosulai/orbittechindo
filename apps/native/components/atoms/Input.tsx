"use client";

import { InputProps } from "@/types";
import { TextInput } from "react-native";

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full ${className}`}
      {...props}
    />
  );
}
