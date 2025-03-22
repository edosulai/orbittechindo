'use client';

import { CarouselProps } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MovieCard } from '../molecules';

export function Carousel({ list, handleMovieClick }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
        window.addEventListener('resize', updateItemsToShow);

        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }
    }, [list, emblaApi]);

    return (
        <div className="overflow-hidden w-full" ref={emblaRef}>
            <motion.div className="flex justify-center items-center">
                {list.slice(0, itemsToShow).map((movie, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MovieCard
                            movie={movie}
                            handleMovieClick={handleMovieClick}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
