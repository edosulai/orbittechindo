"use client";

import { Carousel, MovieList, SearchForm } from '@/components';
import { useProtectedRoute } from '@/hooks';
import { MovieFormData, movieSchema } from '@/schemas';
import { fetchMovieQuery } from '@/services';
import { useMovieStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import '../styles/embla.css';

function Page() {
    const router = useRouter();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();
    const methods = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: useMovieStore.getState(),
    });

    const { title, typeFilter, yearRange, setTitle, setTypeFilter, setYearRange } = useMovieStore();

    const { data, error, isLoading } = useQuery({
        queryKey: ['search-movie', title, typeFilter, yearRange],
        queryFn: async () => {
            const result = await fetchMovieQuery(title || 'all', typeFilter || '', yearRange, 1);
            if (result.Response === 'False') {
                throw new Error(result.Error);
            }
            return result.Search || [];
        },
        enabled: true,
    });

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
            <FormProvider {...methods}>
                <SearchForm
                    typeFilter={typeFilter}
                    yearRange={yearRange}
                    handleTitleChange={handleTitleChange}
                    handleTypeFilterChange={handleTypeFilterChange}
                    handleYearRangeChange={handleYearRangeChange}
                />
            </FormProvider>

            <Carousel movieList={movieList} handleMovieClick={handleMovieClick} />

            <MovieList movieList={movieList} handleMovieClick={handleMovieClick} />

            {isLoading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {movieList.length === 0 && <p>No movies found</p>}
        </div>
    );
}

export default Page;
