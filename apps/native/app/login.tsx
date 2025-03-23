import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useProtectedRoute } from "@/hooks";
import { LoginForm, Footer } from "@/components";

export default function LoginScreen() {
  const router = useRouter();
  const { isAuthenticated, authIsLoading } = useProtectedRoute();

  useEffect(() => {
    if (!authIsLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authIsLoading, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <LoginForm />
        </View>
      </ScrollView>
      <Footer style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
});
