'use client';

import { MoviePoster } from '@/types';

export interface MovieCardProps {
    movie: MoviePoster;
    handleMovieClick: (imdbID: string) => void;
}
