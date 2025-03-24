import { InputProps } from "@/types";
import React from "react";
import { StyleSheet, TextInput } from "react-native";
import tw from "twrnc";

export function Input({ style, ...props }: InputProps) {
  const combinedStyle = StyleSheet.flatten([
    tw`rounded-full border border-solid border-black/[.08] dark:border-white/[.145] items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full`,
    style,
  ]);

  return <TextInput style={combinedStyle} {...props} />;
}
