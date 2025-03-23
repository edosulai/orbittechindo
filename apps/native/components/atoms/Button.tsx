import { ButtonProps } from "@/types";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import tw from "twrnc";

export function Button({ isLoading, children, style, ...props }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const combinedStyle = StyleSheet.flatten([
    tw`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto bg-black cursor-pointer`,
    style,
  ]);

  return (
    <MotiView
      style={combinedStyle as ViewStyle}
      animate={{ scale: isPressed ? 0.95 : 1 }}
    >
      <Pressable
        {...props}
        disabled={isLoading}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {children}
        {isLoading && (
          <MotiView
            style={tw`w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin`}
            animate={{ rotate: "360deg" }}
            transition={{
              repeat: Infinity,
              duration: 1,
              type: "timing",
            }}
          />
        )}
      </Pressable>
    </MotiView>
  );
}
