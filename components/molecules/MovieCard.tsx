'use client';

import { MoviePoster } from '@/types';
import Image from 'next/image';

interface MovieCardProps {
    movie: MoviePoster;
    handleMovieClick: (imdbID: string) => void;
}

export function MovieCard({ movie, handleMovieClick }: MovieCardProps) {
    return (
        <div
            className="flex justify-center p-2 rounded-lg w-fit"
            key={movie.imdbID}
            onClick={() => handleMovieClick(movie.imdbID)}
        >
            <div
                className="flex flex-col justify-center items-center w-[200px] relative cursor-pointer"
                onClick={() => handleMovieClick(movie.imdbID)}
            >
                {movie.Poster.startsWith('http') && (
                    <Image
                        src={movie.Poster}
                        alt={movie.Title}
                        width={200}
                        height={300}
                        className="rounded-lg"
                    />
                )}
                <p className="text-center absolute w-[200px] min-h-14 bottom-0 bg-gray-900/75 text-white flex items-center justify-center rounded-b-lg">
                    {movie.Title} ({movie.Year})
                </p>
            </div>
        </div>
    );
}
