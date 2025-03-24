"use client";

import { SignupFormData, signupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "../atoms";

export function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      console.log(data);
      // Handle form submission
      alert("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type="text"
            placeholder="Username"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type="email"
            placeholder="Email"
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

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type="text"
            placeholder="Phone Number"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      <Button
        type="submit"
        isLoading={isLoading}
        className="transition-transform transform hover:scale-105"
      >
        Signup
      </Button>
    </form>
  );
}
