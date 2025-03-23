import { AppTheme, LabelProps } from "@/types";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "styled-components/native";

export function Label({ style, ...props }: LabelProps) {
  const theme = useTheme() as AppTheme;

  return (
    <Text style={[styles.baseText, { color: theme.text }, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
