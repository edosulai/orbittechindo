"use client";

import { useProtectedRoute } from '@/hooks';
import { MovieFormData, movieSchema } from '@/schemas';
import { fetchMovieQuery } from '@/services';
import { useMovieStore } from '@/stores';
import { MoviePoster } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Masonry from 'react-masonry-css';

import '../styles/embla.css';

function Page() {
    const router = useRouter();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();
    const { register, handleSubmit, formState: { errors } } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
    });

    const title = useMovieStore((state) => state.title);
    const setTitle = useMovieStore((state) => state.setTitle);
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [yearRange, setYearRange] = useState<[number, number]>([1990, 2020]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['search-movie', title, typeFilter, yearRange],
        queryFn: async () => {
            const result = await fetchMovieQuery(title || 'all', typeFilter, yearRange);
            if (result.Response === 'False') {
                throw new Error(result.Error);
            }
            return result.Search || [];
        },
        enabled: true,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
        }
    }, [data, emblaApi]);

    const movieList = useMemo(() => Array.isArray(data) ? data.slice(5) : [], [data]);

    if (authIsLoading || isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        router.replace('/login');
        return null;
    }

    const onSubmit = (data: MovieFormData) => {
        setTitle(data.title);
    };

    const handleMovieClick = (id: string) => {
        router.push(`/movie/${id}`);
    };

    const handleTypeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    };

    const handleYearRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRange = [...yearRange];
        newRange[index] = parseInt(event.target.value, 10);
        setYearRange(newRange as [number, number]);
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

            <div>
                <label>Type Filter:</label>
                <select value={typeFilter} onChange={handleTypeFilterChange}>
                    <option value="">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>
            </div>

            <div>
                <label>Year Range:</label>
                <input
                    type="number"
                    value={yearRange[0]}
                    onChange={(e) => handleYearRangeChange(e, 0)}
                    min="1900"
                    max="2023"
                />
                <input
                    type="number"
                    value={yearRange[1]}
                    onChange={(e) => handleYearRangeChange(e, 1)}
                    min="1900"
                    max="2023"
                />
            </div>

            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {movieList.slice(0, 5).map((movie: MoviePoster) => (
                        <div className="embla__slide" key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                            <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />
                            <p>{movie.Title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {movieList.map((movie: MoviePoster) => (
                    <div key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                        <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />
                        <p>{movie.Title} ({movie.Year})</p>
                    </div>
                ))}
            </Masonry>

            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {movieList.length === 0 && <p>No movies found</p>}
        </div>
    );
}

export default Page;
