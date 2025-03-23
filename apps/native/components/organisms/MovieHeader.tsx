import { useAuthStore } from "@/stores";
import { AppTheme, MovieHeaderProps } from "@/types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useTheme } from "styled-components/native";
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

  const theme = useTheme() as AppTheme;

  return (
    <View style={[styles.container, { borderColor: theme.borderColor }]}>
      <View style={styles.innerContainer}>
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
        <View style={styles.yearContainer}>
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
                  })
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
                  })
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
              onClick: () => logout(),
            },
          ]}
          text=""
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    width: "100%",
    maxWidth: 960,
    padding: 16,
    borderRadius: 9999,
    borderWidth: 1,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  yearContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
