import React from "react";
import { View, Image, Dimensions } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";

const IMAGE_URLS = [
  "https://picsum.photos/300/400",
  "https://picsum.photos/300/500",
  "https://picsum.photos/300/600",
  "https://picsum.photos/300/450",
  "https://picsum.photos/300/550",
  "https://picsum.photos/300/350",
];

const numColumns = 2;
const { width } = Dimensions.get("window");
const columnWidth = width / numColumns - 10;

const Demo = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <MasonryList
        data={IMAGE_URLS}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item as string }}
            style={{
              width: columnWidth,
              height: columnWidth * (Math.random() * (1.5 - 0.5) + 0.5),
              borderRadius: 10,
              marginBottom: 10,
            }}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
};

export default Demo;
