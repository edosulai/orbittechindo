import React from "react";
import { StyleSheet, View } from "react-native";

export function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <View style={styles.spinner}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "static",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "background",
    zIndex: 50,
  },
  spinner: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "blue",
    borderTopColor: "transparent",
    borderStyle: "solid",
    borderRadius: 32,
  },
});
