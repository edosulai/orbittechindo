import { MASONRY_BREAKPOINT_COLUMNS_OBJ } from "@/consts";
import { MasonryProps, MoviePoster } from "@/types";
import MasonryList from "@react-native-seoul/masonry-list";
import { MotiView } from "moti";
import React from "react";
import { Text } from "react-native";
import tw from "twrnc";
import { MovieCard } from "../molecules";

export function Masonry({ list, handleMovieClick }: MasonryProps) {
  return (
    <>
      <MasonryList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        numColumns={MASONRY_BREAKPOINT_COLUMNS_OBJ.default}
        contentContainerStyle={tw`flex gap-2 w-fit`}
        style={tw`w-full flex flex-col gap-2 w-fit`}
        renderItem={({ item }) => {
          const movie = item as MoviePoster;
          return (
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
            </MotiView>
          );
        }}
      />
      {list.length === 0 && <Text>No movies found</Text>}
    </>
  );
}
