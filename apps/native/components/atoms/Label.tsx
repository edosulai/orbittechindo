import { LabelProps } from "@/types";
import React from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";

export function Label({ style, ...props }: LabelProps) {
  const colorScheme = useColorScheme();
  const textStyle = colorScheme === "dark" ? styles.darkText : styles.lightText;

  return <Text style={[styles.baseText, textStyle, style]} {...props} />;
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 14,
    fontWeight: "500",
  },
  lightText: {
    color: "#4B5563", // text-gray-700
  },
  darkText: {
    color: "#D1D5DB", // text-gray-300
  },
});
