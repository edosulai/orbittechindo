'use client';

import { MoviePoster } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import { MovieCard } from '../molecules';

interface CarouselProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

export function Carousel({ list, handleMovieClick }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }
    }, [list, emblaApi]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {list.slice(0, 5).map((movie, i) => (
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
