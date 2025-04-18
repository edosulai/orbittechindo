"use client";

import { MOCK_USER } from "@/consts/index.consts";
import { LoginFormData, loginSchema } from "@/schemas";
import { useAuthStore } from "@/stores";
import { generateToken } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "../atoms";

export function LoginForm() {
  const {
    control,
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="email"
        defaultValue={MOCK_USER.email}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type="email"
            placeholder="Username"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      
      <Controller
        control={control}
        name="password"
        defaultValue={MOCK_USER.password}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type="password"
            placeholder="Password"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        isLoading={isLoading}
        className="transition-transform transform hover:scale-105"
      >
        Login
      </Button>
    </form>
  );
}
