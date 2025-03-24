import { useAuthStore } from "@/stores";
import { MovieHeaderProps } from "@/types";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Button, Input, Select } from "../atoms";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

export function MovieHeader({
  handleTitleChange,
  handleTypeFilterChange,
  handleYearRangeChange,
}: MovieHeaderProps) {
  const [isFilterVisible, setFilterVisible] = useState(false);
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
    <View style={tw`p-4 bg-white shadow-md pt-20`}>
      <View style={tw`flex-row items-center`}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              style={tw`flex-1 border p-2 rounded-lg bg-gray-100`}
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
        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          style={tw`ml-2 p-2`}
        >
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setFilterVisible(false)}
      >
        <View style={tw`bg-white p-4 rounded-lg`}>
          <Text style={tw`text-lg font-bold mb-2`}>Type</Text>
          <Controller
            name="typeFilter"
            control={control}
            render={({ field }) => (
              <Select
                selectedValue={field.value}
                onValueChange={(itemValue) => {
                  field.onChange(itemValue);
                  handleTypeFilterChange(itemValue.toString());
                  setFilterVisible(false);
                }}
                style={tw`border p-2 rounded-lg mb-4`}
              >
                <Picker.Item label="All" value="" />
                <Picker.Item label="Movie" value="movie" />
                <Picker.Item label="Series" value="series" />
              </Select>
            )}
          />

          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold mb-2`}>Start Year</Text>
              <Controller
                name="startYear"
                control={control}
                render={({ field }) => (
                  <Select
                    selectedValue={field.value}
                    onValueChange={(itemValue) => {
                      field.onChange(itemValue);
                      const { endYear } = getValues();
                      handleYearRangeChange([
                        itemValue ? Number(itemValue) : 1900,
                        endYear,
                      ]);
                      setFilterVisible(false);
                    }}
                    style={tw`border p-2 rounded-lg mb-4`}
                  >
                    {generateYears(1900, new Date().getFullYear()).map((yr) => (
                      <Picker.Item key={yr} label={yr.toString()} value={yr} />
                    ))}
                  </Select>
                )}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold mb-2`}>End Year</Text>
              <Controller
                name="endYear"
                control={control}
                render={({ field }) => (
                  <Select
                    selectedValue={field.value}
                    onValueChange={(itemValue) => {
                      field.onChange(itemValue);
                      const { startYear } = getValues();
                      handleYearRangeChange([
                        startYear,
                        itemValue
                          ? Number(itemValue)
                          : new Date().getFullYear(),
                      ]);
                      setFilterVisible(false);
                    }}
                    style={tw`border p-2 rounded-lg mb-4`}
                  >
                    {generateYears(1900, new Date().getFullYear()).map((yr) => (
                      <Picker.Item key={yr} label={yr.toString()} value={yr} />
                    ))}
                  </Select>
                )}
              />
            </View>
          </View>

          <Button onPress={logout} style={tw`ml-auto bg-red-800`}>
            <Text style={tw`text-center text-white`}>Logout</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const generateYears = (start: number, end: number) => {
  let years = [];
  for (let i = end; i >= start; i--) {
    years.push(i);
  }
  return years;
};
