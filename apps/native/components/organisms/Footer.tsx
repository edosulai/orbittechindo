import { AppTheme, FooterProps } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Anchor } from "../atoms";

export function Footer({ style }: FooterProps) {
  const theme = useTheme() as AppTheme;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }, style]}
    >
      <Anchor
        style={styles.anchor}
        url="https://github.com/edosulai/orbittechindo"
      >
        <Image
          aria-hidden
          source={require("../../assets/file.svg")}
          alt="File icon"
          style={styles.icon}
        />
        <Text style={{ color: theme.text }}>Source Code</Text>
      </Anchor>
      <Anchor style={styles.anchor} url="https://edosulai.github.io">
        <Image
          aria-hidden
          source={require("../../assets/globe.svg")}
          alt="Globe icon"
          style={styles.icon}
        />
        <Text style={{ color: theme.text }}>Go to edosulai.github.io →</Text>
      </Anchor>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  anchor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
