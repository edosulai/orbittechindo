'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';
import { MoviePoster } from '@/types';

interface CarouselProps {
    movieList: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

export function Carousel({ movieList, handleMovieClick }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }
    }, [movieList, emblaApi]);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {movieList.slice(0, 5).map((movie) => (
                    <div className="embla__slide" key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                        {movie.Poster.startsWith('http') && <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />}
                        <p>{movie.Title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
