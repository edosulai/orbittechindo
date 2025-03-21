'use client';

import {
    Button,
    Footer,
    GenreDistribution,
    LoadingSpinner,
    RatingsDistribution,
} from '@/components';
import { useProtectedRoute } from '@/hooks';
import { fetchMovieById } from '@/services';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function MovieDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id ? params.id.toString() : null;
    const [isLoading, setIsLoading] = useState(false);

    const {
        data,
        error,
        isLoading: queryIsLoading,
    } = useQuery({
        queryKey: ['detail-movie', id],
        queryFn: async () => {
            const result = await fetchMovieById(id!.toString());

            if (result.Response === 'False') {
                throw new Error(result.Error);
            }

            return result;
        },
        enabled: !!id,
    });

    const { isAuthenticated, authIsLoading, logout } = useProtectedRoute();
    if (!authIsLoading && !isAuthenticated) {
        logout();
    }

    if (queryIsLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!data) {
        return <p>No movie data found</p>;
    }

    const genreData = data.Genre.split(', ').map((genre) => ({
        genre,
        count: 1,
    }));
    const ratingData = data.Ratings.map((rating) => ({
        source: rating.Source,
        value: parseFloat(rating.Value),
    }));

    const handleBackClick = () => {
        setIsLoading(true);
        router.back();
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Button onClick={handleBackClick} isLoading={isLoading}>
                    Back
                </Button>
                <h1 className="text-2xl font-bold">{data.Title}</h1>
                <Image
                    src={data.Poster}
                    alt={data.Title}
                    width={200}
                    height={300}
                />
                <p>
                    <strong>Year:</strong> {data.Year}
                </p>
                <p>
                    <strong>Genre:</strong> {data.Genre}
                </p>
                <p>
                    <strong>Rating:</strong> {data.imdbRating}
                </p>
                <p>
                    <strong>Plot:</strong> {data.Plot}
                </p>
                <p>
                    <strong>Cast:</strong> {data.Actors}
                </p>

                <h2>Genre Distribution</h2>
                <GenreDistribution data={genreData} />

                <h2>Ratings Distribution</h2>
                <RatingsDistribution data={ratingData} />
            </main>
            <Footer />
        </div>
    );
}

export default MovieDetailPage;
