"use client";

import { useAuthStore } from "@/stores";
import { MovieHeaderProps } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { Input, Select } from "../atoms";
import { Dropdown } from "../molecules";

export function MovieHeader({
  handleTitleChange,
  handleTypeFilterChange,
  handleYearRangeChange,
}: MovieHeaderProps) {
  const logout = useAuthStore((state) => state.logout);
  const { control, getValues } = useForm({
    defaultValues: {
      title: "",
      typeFilter: "",
      startYear: new Date(1900, 0, 1).getFullYear(),
      endYear: new Date().getFullYear(),
    },
  });

  return (
    <>
      <View className="mx-auto w-full max-w-6xl p-4 rounded-full border">
        <View className="flex gap-2 items-center justify-between w-full">
          <Controller
            name="typeFilter"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTypeFilterChange(value);
                }}
                items={[
                  { label: "All", value: "" },
                  { label: "Movie", value: "movie" },
                  { label: "Series", value: "series" },
                ]}
              />
            )}
          />
          <View className="flex space-x-2">
            <Controller
              name="startYear"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(date) => {
                    field.onChange(date);
                    const { endYear } = getValues();
                    handleYearRangeChange([date ? date : 1900, endYear]);
                  }}
                  items={[...Array(new Date().getFullYear() - 1900 + 1)].map(
                    (_, i) => ({
                      label: (1900 + i).toString(),
                      value: 1900 + i,
                    }),
                  )}
                />
              )}
            />
            <Controller
              name="endYear"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(date) => {
                    field.onChange(date);
                    const { startYear } = getValues();
                    handleYearRangeChange([
                      startYear,
                      date ? date : new Date().getFullYear(),
                    ]);
                  }}
                  items={[...Array(new Date().getFullYear() - 1900 + 1)].map(
                    (_, i) => ({
                      label: (1900 + i).toString(),
                      value: 1900 + i,
                    }),
                  )}
                />
              )}
            />
          </View>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Search by title"
                onBlur={field.onBlur}
                onChangeText={(date) => {
                  field.onChange(date);
                  const { title } = getValues();
                  handleTitleChange(title);
                }}
                value={field.value}
              />
            )}
          />
          <Dropdown
            items={[
              {
                name: "Logout",
                onClick: logout,
              },
            ]}
          >
            <Image
              src="/vercel.svg"
              alt="Account"
              width={24}
              height={24}
              className="object-contain"
            />
          </Dropdown>
        </View>
      </View>
    </>
  );
}
