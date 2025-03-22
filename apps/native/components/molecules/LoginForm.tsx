import { MOCK_USER } from "@/consts";
import { LoginFormData, loginSchema } from "@/schemas";
import { useAuthStore } from "@/stores";
import { generateToken } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button, Input } from "../atoms";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (
        data.email === MOCK_USER.email &&
        data.password === MOCK_USER.password
      ) {
        const token = await generateToken(data.email);
        login(token);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Token generation failed", error);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex flex-col gap-4">
      <Input
        placeholder="Username"
        value={MOCK_USER.email}
        {...register("email")}
      />
      {errors.email && (
        <Text className="text-red-500">{errors.email.message}</Text>
      )}
      <Input
        placeholder="Password"
        value={MOCK_USER.password}
        {...register("password")}
      />
      {errors.password && (
        <Text className="text-red-500">{errors.password.message}</Text>
      )}
      <Button
        isLoading={isLoading}
        className="transition-transform transform hover:scale-105"
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Login</Text>
      </Button>
    </View>
  );
}
