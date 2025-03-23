import { ViewProps } from "react-native";
import { PickerSelectProps } from "react-native-picker-select";

type CombinedProps = ViewProps & Omit<PickerSelectProps, "style">;

export type SelectProps = CombinedProps;
