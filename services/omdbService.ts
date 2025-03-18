import axios from 'axios';
import { OMDB_API_URL, API_KEY } from '@/consts';
import { MovieData } from '@/types';

/**
 * Fetch movie data from OMDB API by title.
 * @param {string} title - The title of the movie.
 * @returns {Promise<MovieData>} - The movie data.
 */
export async function fetchMovieByTitle(title: string): Promise<MovieData> {
    try {
        const response = await axios.get(OMDB_API_URL, {
            params: {
                apikey: API_KEY,
                t: title
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
}
