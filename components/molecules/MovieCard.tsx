'use client';

import { MoviePoster } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MovieCardProps {
    movie: MoviePoster;
    handleMovieClick: (imdbID: string) => void;
}

export function MovieCard({ movie, handleMovieClick }: MovieCardProps) {
    return (
        <motion.div
            className="flex flex-col items-center rounded-lg shadow-md p-2"
            onClick={() => handleMovieClick(movie.imdbID)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div
                className="flex flex-col justify-center items-center relative cursor-pointer"
                onClick={() => handleMovieClick(movie.imdbID)}
            >
                <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    width={200}
                    height={300}
                    className="rounded-md"
                />
                <div className="absolute min-h-14 bottom-0 bg-gradient-to-t from-gray-900 dark:from-gray-800 to-transparent w-full rounded-b-lg p-2">
                    <h6 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {movie.Title}
                    </h6>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        {movie.Year}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
