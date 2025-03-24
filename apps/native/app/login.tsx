import { Footer, LoginForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function LoginScreen() {
  const { isAuthenticated, authIsLoading } = useProtectedRoute();

  useEffect(() => {
    if (!authIsLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authIsLoading, isAuthenticated, router]);

  return (
    <View style={tw`flex-1 items-center justify-between`}>
      <View style={tw`gap-8 items-center justify-center pt-60`}>
        <Text style={tw`text-2xl font-bold`}>Login</Text>
        <LoginForm />
        <Pressable
          style={tw`text-md font-bold`}
          onPress={() => router.push("/signup")}
        >
          <Text style={tw`text-md font-semibold`}>Sign Up</Text>
        </Pressable>
      </View>
      <Footer style={tw`mb-20`} />
    </View>
  );
}
