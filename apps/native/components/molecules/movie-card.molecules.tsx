import { useValidImage } from "@/hooks";
import { MovieCardProps } from "@/types";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";

export function MovieCard({
  movie,
  handleMovieClick,
  style,
  ...props
}: MovieCardProps) {
  const isValidImage = useValidImage(movie.Poster);
  const [isPressed, setIsPressed] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  return (
    <Pressable
      onPress={() => handleMovieClick(movie.imdbID)}
      onHoverIn={() => setIsPressed(true)}
      onHoverOut={() => setIsPressed(false)}
      style={StyleSheet.flatten([
        tw`rounded-lg overflow-hidden`,
        { width: imageSize.width, height: imageSize.height },
        style,
      ])}
    >
      <MotiView animate={{ scale: isPressed ? 0.95 : 1 }}>
        {isValidImage ? (
          <Image
            source={{ uri: movie.Poster }}
            alt={movie.Title}
            {...props}
            style={StyleSheet.flatten([
              { width: imageSize.width, height: imageSize.height },
              style,
            ])}
            onLoad={(event) => {
              if (Platform.OS !== "web") {
                const { width, height } = event.nativeEvent.source;
                setImageSize({ width, height });
              }
            }}
          />
        ) : (
          <View style={[tw`bg-gray-200 items-center justify-center`, style]}>
            <Text style={tw`text-gray-900 text-center`}>
              Image Not Available
            </Text>
          </View>
        )}

        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-lg pb-8`}
        >
          <Text style={tw`text-white text-lg font-semibold`}>
            {movie.Title}
          </Text>
          <Text style={tw`text-gray-300 text-sm`}>{movie.Year}</Text>
        </View>
      </MotiView>
    </Pressable>
  );
}
