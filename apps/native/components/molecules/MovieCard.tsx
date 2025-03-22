"use client";

import { useValidImage } from "@/hooks";
import { MovieCardProps } from "@/types";
import { motion } from "framer-motion";
import { Image, Text, View } from "react-native";

const MotionView = motion(View);

export function MovieCard({ movie, handleMovieClick }: MovieCardProps) {
  const isValidImage = useValidImage(movie.Poster);

  return (
    <MotionView
      className="flex flex-col items-center rounded-lg shadow-md p-2"
      onTap={() => handleMovieClick(movie.imdbID)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <View className="flex flex-col justify-center items-center relative cursor-pointer">
        {isValidImage ? (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            width={200}
            height={300}
            className="rounded-md"
          />
        ) : (
          <View className="w-[200px] h-[300px] flex items-center justify-center bg-gray-200 rounded-md">
            <Text className="text-gray-900">Image Not Available</Text>
          </View>
        )}
        <View className="absolute min-h-14 bottom-0 bg-gradient-to-t from-gray-900 dark:from-gray-800 to-transparent w-full rounded-b-lg p-2">
          <Text className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {movie.Title}
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {movie.Year}
          </Text>
        </View>
      </View>
    </MotionView>
  );
}
