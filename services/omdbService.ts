import { API_KEY, OMDB_API_URL } from '@/consts';
import { MovieData, Masonry, MovieRequest } from '@/types';
import axios from 'axios';

/**
 * Fetch movie data from OMDB API by query.
 * @param {string} query - The search query for the movies.
 * @param {string} type - The type of the movie (e.g., "movie" or "series").
 * @param {number[]} yearRange - The range of years for the movies.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<MovieData[]>} - The list of movie data.
 * @throws {Error} - An error.
 * @example
 * const movies = await fetchMovieQuery('Guardians', 'movie', [1990, 2020], 1);
 */
export async function fetchMovieQuery(query: string, type: string, yearRange: number[], page: number = 1) {
    try {
        const params: MovieRequest = {
            apikey: API_KEY,
            type: type,
            y: `${yearRange[0]}-${yearRange[1]}`,
            page
        };

        if (query.length < 3) {
            params.t = query; // Switch to title search
        } else {
            params.s = query; // Use search query
        }

        const response = await axios.get<Masonry>(OMDB_API_URL, { params });
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
export async function fetchMovieById(id: string) {
    try {
        const response = await axios.get<MovieData>(OMDB_API_URL, {
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
