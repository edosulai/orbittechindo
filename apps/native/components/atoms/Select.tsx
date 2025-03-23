import { AppTheme, SelectProps } from "@/types";
import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerStyle } from "react-native-picker-select";
import { useTheme } from "styled-components/native";

export function Select({ style, ...props }: SelectProps) {
  const theme = useTheme() as AppTheme;

  const combinedStyle = StyleSheet.flatten([
    styles.input,
    {
      borderColor: theme.borderColor,
      backgroundColor: theme.background,
    },
    style,
  ]);

  return <RNPickerSelect style={combinedStyle as PickerStyle} {...props} />;
}

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
