"use client";

import { Input } from '@/components';
import { useProtectedRoute } from '@/hooks';
import { MovieFormData, movieSchema } from '@/schemas';
import { fetchMovieQuery } from '@/services';
import { useMovieStore } from '@/stores';
import { MoviePoster } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Masonry from 'react-masonry-css';

import '../styles/embla.css';

function Page() {
    const router = useRouter();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();
    const { control, formState: { errors } } = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: useMovieStore.getState(),
    });

    const { title, typeFilter, yearRange, setTitle, setTypeFilter, setYearRange } = useMovieStore();

    const { data, error, isLoading } = useQuery({
        queryKey: ['search-movie', title, typeFilter, yearRange],
        queryFn: async () => {
            const result = await fetchMovieQuery(title || 'all', typeFilter || '', yearRange, 1); // Add page parameter
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

    if (authIsLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        router.replace('/login');
        return null;
    }

    const handleTitleChange = debounce((value: string) => {
        setTitle(value);
    }, 300);

    const handleTypeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    };

    const handleYearRangeChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newRange = [...yearRange];
        newRange[index] = parseInt(event.target.value, 10);
        setYearRange(newRange as [number, number]);
    };

    const handleMovieClick = (imdbID: string) => {
        router.push(`/${imdbID}`);
    };

    return (
        <div>
            <h1>OMDB Movie Search</h1>
            <form>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                handleTitleChange(e.target.value);
                            }}
                        />
                    )}
                />
                {errors.title && <p>{errors.title.message}</p>}

                <label>Type Filter:</label>
                <select value={typeFilter || ''} onChange={handleTypeFilterChange}>
                    <option value="">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select>

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
            </form>

            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {movieList.slice(0, 5).map((movie: MoviePoster) => (
                        <div className="embla__slide" key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)}>
                            {movie.Poster.startsWith('http') && <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />}
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
                        {movie.Poster.startsWith('http') && <Image src={movie.Poster} alt={movie.Title} width={200} height={300} />}
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
