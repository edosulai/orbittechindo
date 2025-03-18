import { useQuery } from '@tanstack/react-query';
import { fetchMovieByTitle } from '@/services';

/**
 * Custom hook to fetch movie data by title using react-query.
 * @param {string} title - The title of the movie.
 * @returns {Object} - The react-query result object.
 */
export function useMovie(title: string) {
    return useQuery({
        queryKey: ['movie', title],
        queryFn: () => fetchMovieByTitle(title),
        enabled: !!title, // Only run the query if the title is not empty
    });
}
