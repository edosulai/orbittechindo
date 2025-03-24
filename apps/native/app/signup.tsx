import { Footer, SignupForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function SignupScreen() {
  const { isAuthenticated, authIsLoading } = useProtectedRoute();

  useEffect(() => {
    if (!authIsLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authIsLoading, isAuthenticated, router]);

  return (
    <View style={tw`flex-1 items-center justify-between`}>
      <View style={tw`gap-8 items-center justify-center py-40`}>
        <Text style={tw`text-2xl font-bold`}>Sign Up</Text>
        <SignupForm />
        <Pressable
          style={tw`text-md font-bold`}
          onPress={() => router.push("/login")}
        >
          <Text style={tw`text-md font-semibold`}>Login</Text>
        </Pressable>
      </View>
      <Footer />
    </View>
  );
}
