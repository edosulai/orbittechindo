import { SelectProps } from "@/types";
import { Picker } from "@react-native-picker/picker";
import React from "react";

export function Select({ ...props }: SelectProps) {
  return <Picker {...props} />;
}
