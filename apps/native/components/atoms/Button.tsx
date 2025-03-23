// import { AppTheme, ButtonProps } from "@/types";
// import React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { useTheme } from "styled-components/native";

// export function Button({ style, isLoading, text, ...props }: ButtonProps) {
//   const theme = useTheme() as AppTheme;

//   const combinedButtonStyle = StyleSheet.flatten([
//     styles.button,
//     {
//       backgroundColor: theme.background,
//       color: theme.text,
//     },
//     style,
//   ]);

//   const combinedViewStyle = StyleSheet.flatten([
//     styles.spinner,
//     { borderColor: theme.borderColor },
//   ]);

//   return (
//     <Pressable style={combinedButtonStyle} disabled={isLoading} {...props}>
//       <View style={styles.wrapper}>
//         <Text style={{ color: theme.text }}>{text}</Text>
//         {isLoading && <View style={combinedViewStyle} />}
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 9999,
//     borderWidth: 1,
//     borderColor: "transparent",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     fontSize: 14,
//     height: 40,
//     paddingHorizontal: 16,
//   },
//   wrapper: {
//     display: "flex",
//     flexDirection: "row",
//     gap: 8,
//   },
//   spinner: {
//     width: 20,
//     height: 20,
//     borderWidth: 4,
//     borderTopColor: "transparent",
//     borderRadius: 9999,
//   },
// });

import { ButtonProps } from "@/types";
import { Pressable, Text, View, ViewStyle } from "react-native";
import tw from 'twrnc';

export function Button({
  text,
  isLoading,
  children,
  style,
  ...props
}: ButtonProps) {
  
  return (
    <Pressable
      style={[tw`rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto`, style as ViewStyle]}
      {...props}
      disabled={isLoading}
    >
      <Text style={tw`text-white`}>{text}</Text>
      {isLoading && (
        <View
          style={tw`w-5 h-5 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin`}
        />
      )}
    </Pressable>
  );
}