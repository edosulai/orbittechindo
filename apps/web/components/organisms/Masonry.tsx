"use client";

import { MASONRY_BREAKPOINT_COLUMNS_OBJ } from "@/consts";
import { MasonryProps } from "@/types";
import { motion } from "framer-motion";
import ReactMasonry from "react-masonry-css";
import { MovieCard } from "../molecules";

export function Masonry({ list, handleMovieClick }: MasonryProps) {
  return (
    <>
      <ReactMasonry
        breakpointCols={MASONRY_BREAKPOINT_COLUMNS_OBJ}
        className="flex gap-2 w-fit"
        columnClassName="w-full flex flex-col gap-2 w-fit"
      >
        {list.map((movie, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MovieCard movie={movie} handleMovieClick={handleMovieClick} />
          </motion.div>
        ))}
      </ReactMasonry>
      {list.length === 0 && <p>No movies found</p>}
    </>
  );
}
