import { AppTheme } from "@/types";

export const DarkTheme: AppTheme = {
  background: "#0a0a0a",
  invertedBackground: "#ffffff",
  text: "#ffffff",
  invertedText: "#000000",
  borderColor: "#ffffff",
  foreground: "#ededed",
  fontSans: "var(--font-geist-sans)",
  fontMono: "var(--font-geist-mono)",
  // ...other dark theme properties
};

export const LightTheme: AppTheme = {
  background: "#ffffff",
  invertedBackground: "#000000",
  text: "#000000",
  invertedText: "#ffffff",
  borderColor: "#000000",
  foreground: "#171717",
  fontSans: "var(--font-geist-sans)",
  fontMono: "var(--font-geist-mono)",
  // ...other light theme properties
};
