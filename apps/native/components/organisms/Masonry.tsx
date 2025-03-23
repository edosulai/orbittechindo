import { MASONRY_BREAKPOINT_COLUMNS_OBJ } from "@/consts";
import { MasonryProps, MoviePoster } from "@/types";
import MasonryList from "@react-native-seoul/masonry-list";
import React from "react";
import { Text } from "react-native";
import { MovieCard } from "../molecules";

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
            <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
          );
        }}
        contentContainerStyle={{ gap: 8 }}
      />
      {list.length === 0 && <Text>No movies found</Text>}
    </>
  );
}
