import { useValidImage } from "@/hooks";
import { MovieCardProps } from "@/types";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export function MovieCard({ movie, handleMovieClick }: MovieCardProps) {
  const isValidImage = useValidImage(movie.Poster);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => handleMovieClick(movie.imdbID)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <MotiView
        style={tw`flex flex-col items-center rounded-lg shadow-md p-2 cursor-pointer`}
        animate={{ scale: isPressed ? 0.95 : 1 }}
      >
        <View style={tw`flex flex-col justify-center items-center relative`}>
          {isValidImage ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              width={200}
              height={300}
              style={tw`rounded-md`}
            />
          ) : (
            <View
              style={tw`w-[200px] h-[300px] flex items-center justify-center bg-gray-200 rounded-md`}
            >
              <Text style={tw`text-gray-900`}>Image Not Available</Text>
            </View>
          )}
          <View
            style={tw`absolute min-h-14 bottom-0 bg-gradient-to-t from-gray-900 dark:from-gray-800 to-transparent w-full rounded-b-lg p-2`}
          >
            <Text
              style={tw`mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100`}
            >
              {movie.Title}
            </Text>
            <Text style={tw`text-xs text-gray-600 dark:text-gray-400`}>
              {movie.Year}
            </Text>
          </View>
        </View>
      </MotiView>
    </TouchableOpacity>
  );
}
