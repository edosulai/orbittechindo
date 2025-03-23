import { DarkTheme, LightTheme } from "@/themes";
import { SelectProps } from "@/types";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export function Select({ style, ...props }: SelectProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

  const combinedStyle = StyleSheet.flatten([
    styles.container,
    {
      borderColor: theme.borderColor,
      backgroundColor: theme.background,
    },
    style,
  ]);

  return (
    <View style={combinedStyle}>
      <RNPickerSelect
        style={{
          inputIOS: {
            color: theme.text,
            ...styles.input,
          },
          inputAndroid: {
            color: theme.text,
            ...styles.input,
          },
        }}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 16,
    width: "100%",
  },
  input: {
    fontSize: 14,
    fontWeight: "500",
  },
});
