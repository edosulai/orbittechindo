import { FooterProps } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import tw from "twrnc";
import { Anchor } from "../atoms";

export function Footer({ style }: FooterProps) {
  const parentStyle = StyleSheet.flatten([
    tw`flex-row gap-4 flex-wrap items-center justify-center`,
    style,
  ]);

  return (
    <View style={parentStyle as ViewStyle}>
      <Anchor
        style={tw`flex-row items-center gap-1 hover:underline hover:underline-offset-4`}
        url="https://github.com/edosulai/orbittechindo"
      >
        <Image
          aria-hidden
          source={require("@/assets/file.svg")}
          alt="File icon"
          width={16}
          height={16}
        />
        <Text>Source Code</Text>
      </Anchor>
      <Anchor
        style={tw`flex-row items-center gap-1 hover:underline hover:underline-offset-4`}
        url="https://edosulai.github.io"
      >
        <Image
          aria-hidden
          source={require("@/assets/globe.svg")}
          alt="Globe icon"
          width={16}
          height={16}
        />
        <Text>Go to edosulai.github.io →</Text>
      </Anchor>
    </View>
  );
}
