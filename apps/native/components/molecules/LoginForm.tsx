import { MOCK_USER } from "@/consts";
import { LoginFormData, loginSchema } from "@/schemas";
import { useAuthStore } from "@/stores";
import { generateToken } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Button, Input } from "../atoms";

export function LoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
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
    <View style={tw`flex flex-col gap-4`}>
      <Controller
        control={control}
        name="email"
        defaultValue={MOCK_USER.email}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={tw`text-red-500`}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        defaultValue={MOCK_USER.password}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={tw`text-red-500`}>{errors.password.message}</Text>
      )}
      <Button
        isLoading={isLoading}
        style={tw`transition-transform transform hover:scale-105`}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={tw`text-white`}>Login</Text>
      </Button>
    </View>
  );
}
