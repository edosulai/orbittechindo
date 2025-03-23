import { CarouselProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import RNCarousel from "react-native-reanimated-carousel";
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
    <RNCarousel
      width={300}
      height={400}
      data={list.slice(0, itemsToShow)}
      renderItem={({ item: movie, index }) => (
        <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
      )}
    />
  );
}
