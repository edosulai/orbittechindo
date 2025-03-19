"use client";

import { GenreDistribution, RatingsDistribution } from '@/components';
import { Button } from '@/components/atoms/Button';
import { useProtectedRoute } from '@/hooks';
import { fetchMovieById } from '@/services';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

function MovieDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const { isAuthenticated, authIsLoading } = useProtectedRoute();

    const { data, error, isLoading } = useQuery({
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

    if (authIsLoading || isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        router.replace('/login');
        return null;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!data) {
        return <p>No movie data found</p>;
    }

    const genreData = data.Genre.split(', ').map((genre) => ({ genre, count: 1 }));
    const ratingData = data.Ratings.map((rating) => ({
        source: rating.Source,
        value: parseFloat(rating.Value),
    }));

    return (
        <div>
            <Button onClick={() => router.back()}>Back</Button>
            <h1>{data.Title}</h1>
            <Image src={data.Poster} alt={data.Title} width={200} height={300} />
            <p><strong>Year:</strong> {data.Year}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>Rating:</strong> {data.imdbRating}</p>
            <p><strong>Plot:</strong> {data.Plot}</p>
            <p><strong>Cast:</strong> {data.Actors}</p>

            <h2>Genre Distribution</h2>
            <GenreDistribution data={genreData} />

            <h2>Ratings Distribution</h2>
            <RatingsDistribution data={ratingData} />
        </div>
    );
}

export default MovieDetailPage;
