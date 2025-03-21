'use client';

import { MoviePoster } from '@/types';
import ReactMasonry from 'react-masonry-css';
import { MovieCard } from '../molecules';

interface MasonryProps {
    list: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2
};

export function Masonry({ list, handleMovieClick }: MasonryProps) {
    return (
        <>
            <ReactMasonry
                breakpointCols={breakpointColumnsObj}
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
            </ReactMasonry>
            {list.length === 0 && <p>No movies found</p>}
        </>
    );
}
