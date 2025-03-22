import { AnchorProps } from "@/types";
import { Linking, Text, TouchableOpacity } from "react-native";

export function Anchor({ url, ...props }: AnchorProps) {
  const handlePress = () => Linking.openURL(url);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text {...props}>Go to Example</Text>
    </TouchableOpacity>
  );
}
