import { PressableProps } from "react-native";

type CombinedProps = PressableProps;

export interface ButtonProps extends CombinedProps {
  children: React.ReactNode;
  isLoading?: boolean;
}
