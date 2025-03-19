'use client';

import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { MoviePoster } from '@/types';

interface MovieListProps {
    movieList: MoviePoster[];
    handleMovieClick: (imdbID: string) => void;
}

export function MovieList({ movieList, handleMovieClick }: MovieListProps) {
    return (
        <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {movieList.map((movie) => (
                <div key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                    {movie.Poster.startsWith('http') && <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />}
                    <p>{movie.Title} ({movie.Year})</p>
                </div>
            ))}
        </Masonry>
    );
}
