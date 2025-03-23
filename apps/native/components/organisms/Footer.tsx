import React from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import tw from "twrnc";
import { Anchor } from "../atoms";

export function Footer() {
  return (
    <View style={tw`row-start-3 flex gap-[24px] flex-wrap items-center justify-center`}>
      <Anchor
        style={tw`flex items-center gap-2 hover:underline hover:underline-offset-4`}
        url="https://github.com/edosulai/orbittechindo"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        <Text>Source Code</Text>
      </Anchor>
      <Anchor
        style={tw`flex items-center gap-2 hover:underline hover:underline-offset-4`}
        url="https://edosulai.github.io"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        <Text>Go to edosulai.github.io →</Text>
      </Anchor>
    </View>
  );
}
