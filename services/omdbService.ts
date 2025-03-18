import { API_KEY, OMDB_API_URL } from '@/consts';
import { MovieData } from '@/types';
import axios from 'axios';

/**
 * Fetch movie data from OMDB API by title.
 * @param {string} title - The title of the movie.
 * @returns {Promise<MovieData>} - The movie data.
 * @throws {Error} - An error.
 * @example
 * const movie = await fetchMovieByTitle('Guardians of the Galaxy Vol. 2');
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

/**
 * Fetch movie data from OMDB API by ID.
 * @param {string} id - The ID of the movie.
 * @returns {Promise<MovieData>} - The movie data.
 * @throws {Error} - An error.
 * @example
 * const movie = await fetchMovieById('tt3896198');
 */
export async function fetchMovieById(id: string): Promise<MovieData> {
    try {
        const response = await axios.get(OMDB_API_URL, {
            params: {
                apikey: API_KEY,
                i: id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        throw error;
    }
}
