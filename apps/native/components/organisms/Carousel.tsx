"use client";

import { CarouselProps } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RNCarousel from "react-native-reanimated-carousel";
import { MovieCard } from "../molecules";

export function Carousel({ list, handleMovieClick }: CarouselProps) {
  const [itemsToShow, setItemsToShow] = useState(2);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
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
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  return (
    <RNCarousel
      width={300}
      height={400}
      data={list.slice(0, itemsToShow)}
      renderItem={({ item: movie, index }) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
        </motion.div>
      )}
    />
  );
}
