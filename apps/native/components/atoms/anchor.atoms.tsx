import { AnchorProps } from "@/types";
import { Linking, TouchableOpacity, View } from "react-native";

export function Anchor({ url, ...props }: AnchorProps) {
  const handlePress = () => Linking.openURL(url);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View {...props} />
    </TouchableOpacity>
  );
}
