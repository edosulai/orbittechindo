"use client";

import { MASONRY_BREAKPOINT_COLUMNS_OBJ } from "@/consts";
import { MasonryProps, MoviePoster } from "@/types";
import MasonryList from "@react-native-seoul/masonry-list";
import { motion } from "framer-motion";
import { Text, View } from "react-native";
import { MovieCard } from "../molecules";

const MotionView = motion(View);

export function Masonry({ list, handleMovieClick }: MasonryProps) {
  return (
    <>
      <MasonryList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        numColumns={MASONRY_BREAKPOINT_COLUMNS_OBJ.default}
        renderItem={({ item }) => {
          const movie = item as MoviePoster;
          return (
            <MotionView
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
            </MotionView>
          );
        }}
        contentContainerStyle={{ gap: 8 }}
      />
      {list.length === 0 && <Text>No movies found</Text>}
    </>
  );
}
