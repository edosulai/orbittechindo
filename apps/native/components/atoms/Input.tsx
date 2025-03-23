import { InputProps } from "@/types";
import React from "react";
import { StyleSheet, TextInput, useWindowDimensions } from "react-native";
import { useTheme } from "styled-components/native";

const styles = StyleSheet.create({
  input: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: 14,
    height: 40,
    padding: 16,
    width: "100%",
  },
  inputSm: {
    fontSize: 16,
    height: 48,
    padding: 20,
  },
});

export function Input({ style, ...props }: InputProps) {
  const theme = useTheme(); // Use theme from styled-components
  const { width } = useWindowDimensions(); // Get screen width

  const isSmallScreen = width < 375; // Define small screen threshold

  const combinedStyle = StyleSheet.flatten([
    styles.input,
    {
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
    }, // Apply theme styles
    isSmallScreen && styles.inputSm,
    style,
  ]);

  return <TextInput style={combinedStyle} {...props} />;
}
