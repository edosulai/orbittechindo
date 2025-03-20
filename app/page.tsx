'use client';

import { Carousel, Footer, MovieHeader, MovieList } from '@/components';
import { useProtectedRoute } from '@/hooks';
import { MovieFormData, movieSchema } from '@/schemas';
import { fetchMovieQuery } from '@/services';
import { useMovieStore } from '@/stores';
import { MoviePoster } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function Page() {
    const router = useRouter();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();
    const methods = useForm<MovieFormData>({
        resolver: zodResolver(movieSchema),
        defaultValues: useMovieStore.getState(),
    });

    const {
        title,
        typeFilter,
        yearRange,
        setTitle,
        setTypeFilter,
        setYearRange,
    } = useMovieStore();
    const [movies, setMovies] = useState<MoviePoster[]>([]);
    const loadMoreRef = useRef(null);

    const fetchMovies = async ({ pageParam = 1 }) => {
        const result = await fetchMovieQuery(
            title || 'all',
            typeFilter || '',
            yearRange,
            pageParam,
        );
        if (result.Response === 'False') {
            throw new Error(result.Error);
        }
        return result.Search || [];
    };

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['search-movie', title, typeFilter, yearRange],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: true,
    });

    useEffect(() => {
        if (data) {
            setMovies(data.pages.flat());
        }
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 },
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 10 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

    const handleTypeFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setTypeFilter(event.target.value);
    };

    const handleYearRangeChange = (value: [number, number]) => {
        setYearRange(value);
    };

    const handleMovieClick = (imdbID: string) => {
        router.push(`/${imdbID}`);
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <FormProvider {...methods}>
                <MovieHeader
                    typeFilter={typeFilter}
                    yearRange={yearRange}
                    handleTitleChange={handleTitleChange}
                    handleTypeFilterChange={handleTypeFilterChange}
                    handleYearRangeChange={handleYearRangeChange}
                />
            </FormProvider>
            <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
                <Carousel
                    list={movies.slice(0, 5)}
                    handleMovieClick={handleMovieClick}
                />
                <MovieList list={movies} handleMovieClick={handleMovieClick} />

                {isLoading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                {hasNextPage && (
                    <div ref={loadMoreRef} style={{ height: '50px' }} />
                )}
            </main>
            {!hasNextPage && <Footer />}
        </div>
    );
}

export default Page;
