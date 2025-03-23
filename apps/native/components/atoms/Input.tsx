import { AppTheme, InputProps } from "@/types";
import React from "react";
import { StyleSheet, TextInput } from "react-native";
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
});

export function Input({ style, ...props }: InputProps) {
  const theme = useTheme() as AppTheme;

  const combinedStyle = StyleSheet.flatten([
    styles.input,
    {
      borderColor: theme.borderColor,
      backgroundColor: theme.background,
    },
    style,
  ]);

  return <TextInput style={combinedStyle} {...props} />;
}
