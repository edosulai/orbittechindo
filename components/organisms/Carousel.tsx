'use client';

import { MoviePoster } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import { MovieCard } from '../molecules';

interface CarouselProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

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
            <div className="flex justify-center items-center">
                {list.slice(0, itemsToShow).map((movie, i) => (
                    <MovieCard
                        key={i}
                        movie={movie}
                        handleMovieClick={handleMovieClick}
                    />
                ))}
            </div>
        </div>
    );
}
