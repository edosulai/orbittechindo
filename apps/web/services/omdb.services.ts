import { OMDB_API_KEY, OMDB_API_URL } from "@/consts/index.consts";
import { MovieData, MovieList, MovieRequest } from "@/types";
import axios from "axios";

/**
 * Fetch movie data from OMDB API by query.
 * @param {string} query - The search query for the movies.
 * @param {string} type - The type of the movie (e.g., "movie" or "series").
 * @param {number} year - The years for the movies.
 * @param {number} page - The page number for pagination.
 * @returns {Promise<MovieData[]>} - The list of movie data.
 * @throws {Error} - An error.
 * @example
 * const movies = await fetchMovieQuery('Guardians', 'movie', [1990, 2020], 1);
 */
export async function fetchMovieQuery(
  query: string,
  type: string,
  page: number = 1,
  year?: number,
) {
  try {
    const params: MovieRequest = {
      apikey: OMDB_API_KEY,
      type: type,
      y: year,
      page,
    };

    if (query.length < 3) {
      params.t = query; // Switch to title search
    } else {
      params.s = query; // Use search query
    }

    const response = await axios.get<MovieList>(OMDB_API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
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
        apikey: OMDB_API_KEY,
        i: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
}
