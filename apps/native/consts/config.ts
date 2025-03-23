import Constants from "expo-constants";

export const OMDB_API_URL = "http://www.omdbapi.com/";
export const OMDB_API_KEY = Constants.expoConfig?.extra?.OMDB_API_KEY || "";
export const JWT_KEY = Constants.expoConfig?.extra?.JWT_KEY || "secret";

export const MOCK_USER = {
  email: "test@example.com",
  password: "password123",
};

export const FIREBASE_CONFIG = {
  apiKey: undefined,
  authDomain: undefined,
  projectId: undefined,
  storageBucket: undefined,
  messagingSenderId: undefined,
  appId: undefined,
  measurementId: undefined,
};
