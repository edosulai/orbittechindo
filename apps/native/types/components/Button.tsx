import { PressableProps } from "react-native";

type CombinedProps = PressableProps;

export interface ButtonProps extends CombinedProps {
  text: string;
  isLoading?: boolean;
}
