'use client';

import { MoviePoster } from '@/types';

export interface CarouselProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}
