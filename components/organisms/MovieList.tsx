'use client';

import { MoviePoster } from '@/types';
import Masonry from 'react-masonry-css';
import { MovieCard } from '../molecules';

interface MovieListProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

export function MovieList({ list, handleMovieClick }: MovieListProps) {
    return (
        <Masonry
            breakpointCols={3}
            className="flex gap-2 w-fit"
            columnClassName="w-full flex flex-col gap-2 w-fit"
        >
            {list.map((movie, i) => (
                <MovieCard
                    key={i}
                    movie={movie}
                    handleMovieClick={handleMovieClick}
                />
            ))}
        </Masonry>
    );
}
