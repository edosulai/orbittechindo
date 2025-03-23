import { Footer, LoginForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function LoginScreen() {
  const { isAuthenticated, authIsLoading } = useProtectedRoute();

  useEffect(() => {
    if (!authIsLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authIsLoading, isAuthenticated, router]);

  return (
    <View
      style={tw`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16`}
    >
      <View
        style={tw`flex flex-col gap-8 row-start-2 items-center sm:items-star`}
      >
        <Text style={tw`text-2xl sm:text-3xl font-bold`}>Login</Text>
        <LoginForm />
      </View>
      <Footer />
    </View>
  );
}
