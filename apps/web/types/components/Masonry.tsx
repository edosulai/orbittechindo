'use client';

import { MoviePoster } from '@/types';

export interface MasonryProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}
