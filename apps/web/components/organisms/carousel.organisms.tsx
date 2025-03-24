"use client";

import { usePrevNextButtons } from "@/hooks";
import { CarouselProps } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { NextButton, PrevButton } from "../atoms";
import { MovieCard } from "../molecules";

export function Carousel({ list, handleMovieClick }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      breakpoints: {
        "(max-width: 640px)": { slidesToScroll: 1 },
        "(min-width: 641px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
        "(min-width: 1280px)": { slidesToScroll: 4 },
      },
    },
    [Autoplay()]
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="max-w-3xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <motion.div className="flex ml-1 [touch-action:_pan-y_pinch-zoom]">
          {list.map((movie, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="min-w-0 [flex:_0_0_35%]"
            >
              <MovieCard
                movie={movie}
                handleMovieClick={handleMovieClick}
                className="flex items-center justify-center h-72"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
}
