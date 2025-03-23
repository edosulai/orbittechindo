import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const Storage = {
  async getItem(key: string): Promise<string | null> {
    return isWeb ? localStorage.getItem(key) : await SecureStore.getItemAsync(key);
  },

  async setItem(key: string, value: string): Promise<void> {
    return isWeb
      ? localStorage.setItem(key, value)
      : await SecureStore.setItemAsync(key, value);
  },

  async deleteItemAsync(key: string): Promise<void> {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};
