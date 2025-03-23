import { ButtonProps } from "@/types";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";

export function Button({ style, isLoading, text, ...props }: ButtonProps) {
  const theme = useTheme();

  const backgroundColor = theme?.colors?.foreground || "#000";
  const textColor = theme?.colors?.background || "#fff";
  const borderColor = theme?.colors?.blue || "#0000ff";

  const combinedButtonStyle = StyleSheet.flatten([
    styles.button,
    {
      backgroundColor,
      color: textColor,
    },
    style,
  ]);

  const combinedViewStyle = StyleSheet.flatten([
    styles.spinner,
    { borderColor },
  ]);

  return (
    <Pressable style={combinedButtonStyle} disabled={isLoading} {...props}>
      <View style={styles.wrapper}>
        <Text style={{ color: textColor }}>{text}</Text>
        {isLoading && <View style={combinedViewStyle} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 14,
    height: 40,
    paddingHorizontal: 16,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  spinner: {
    width: 20,
    height: 20,
    borderWidth: 4,
    borderTopColor: "transparent",
    borderRadius: 9999,
  },
});
