export const OMDB_API_URL = "http://www.omdbapi.com/";
export const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || "733acc89";
export const JWT_KEY = process.env.NEXT_PUBLIC_JWT_KEY || "secret";

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
