import { CarouselProps } from "@/types";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import RNCarousel from "react-native-reanimated-carousel";
import tw from "twrnc";
import { MovieCard } from "../molecules";

export function Carousel({ list, handleMovieClick }: CarouselProps) {
  const [itemsToShow, setItemsToShow] = useState(2);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = Dimensions.get("window").width;
      if (width >= 1200) {
        setItemsToShow(5);
      } else if (width >= 992) {
        setItemsToShow(4);
      } else if (width >= 768) {
        setItemsToShow(3);
      } else {
        setItemsToShow(2);
      }
    };

    updateItemsToShow();
    const subscription = Dimensions.addEventListener(
      "change",
      updateItemsToShow
    );

    return () => subscription?.remove();
  }, []);

  return (
    <View style={tw`overflow-hidden w-full`}>
      <MotiView style={tw`flex justify-center items-center`}>
        <RNCarousel
          width={300}
          height={400}
          data={list.slice(0, itemsToShow)}
          renderItem={({ item: movie, index }) => (
            <MotiView
              key={index}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
            </MotiView>
          )}
        />
      </MotiView>
    </View>
  );
}
