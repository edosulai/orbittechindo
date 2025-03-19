"use client";

import { useProtectedRoute } from '@/hooks';
import { fetchMovieById } from '@/services';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

function MovieDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const {isAuthenticated, authIsLoading} = useProtectedRoute();

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
            <button onClick={() => router.back()}>Back</button>
            <h1>{data.Title}</h1>
            <Image src={data.Poster} alt={data.Title} width={200} height={300} />
            <p><strong>Year:</strong> {data.Year}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>Rating:</strong> {data.imdbRating}</p>
            <p><strong>Plot:</strong> {data.Plot}</p>
            <p><strong>Cast:</strong> {data.Actors}</p>

            <h2>Genre Distribution</h2>
            <BarChart width={600} height={300} data={genreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="genre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>

            <h2>Ratings Distribution</h2>
            <BarChart width={600} height={300} data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}

export default MovieDetailPage;
