import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

export function LoadingSpinner() {
  return (
    <MotiView
      style={tw`inset-0 justify-center items-center bg-background z-50`}
      animate={{ rotate: "360deg" }}
      transition={{ repeat: Infinity, duration: 1, type: "timing" }}
    >
      <View
        style={tw`w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full`}
      />
    </MotiView>
  );
}
