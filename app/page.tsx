"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMovie } from '@/hooks';
import { movieSchema, MovieFormData } from '@/schemas';
import { useMovieStore } from '@/stores';

const Page = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
    });

    const title = useMovieStore((state) => state.title);
    const setTitle = useMovieStore((state) => state.setTitle);
    const { data, error, isLoading } = useMovie(title);

    const onSubmit = (data: MovieFormData) => {
        setTitle(data.title);
    };

    return (
        <div>
            <h1>OMDB Movie Search</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('title')}
                    placeholder="Enter movie title"
                />
                {errors.title && <p>{errors.title.message}</p>}
                <button type="submit">Search</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching movie data</p>}
            {data && (
                <div>
                    <h2>{data.Title}</h2>
                    <p><strong>Year:</strong> {data.Year}</p>
                    <p><strong>Rated:</strong> {data.Rated}</p>
                    <p><strong>Released:</strong> {data.Released}</p>
                    <p><strong>Runtime:</strong> {data.Runtime}</p>
                    <p><strong>Genre:</strong> {data.Genre}</p>
                    <p><strong>Director:</strong> {data.Director}</p>
                    <p><strong>Writer:</strong> {data.Writer}</p>
                    <p><strong>Actors:</strong> {data.Actors}</p>
                    <p><strong>Plot:</strong> {data.Plot}</p>
                    <p><strong>Language:</strong> {data.Language}</p>
                    <p><strong>Country:</strong> {data.Country}</p>
                    <p><strong>Awards:</strong> {data.Awards}</p>
                    <img src={data.Poster} alt={data.Title} />
                    <p><strong>Metascore:</strong> {data.Metascore}</p>
                    <p><strong>IMDB Rating:</strong> {data.imdbRating}</p>
                    <p><strong>IMDB Votes:</strong> {data.imdbVotes}</p>
                </div>
            )}
        </div>
    );
};

export default Page;
