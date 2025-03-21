import { MovieFormData } from "@/schemas";

export interface MovieDataStore extends MovieFormData {
  setTitle: (title: string) => void;
  setTypeFilter: (typeFilter: string) => void;
  setYearRange: (yearRange: [number, number]) => void;
}

export interface MovieRequest {
  apikey: string;
  type: string;
  y: string;
  page: number;
  t?: string;
  s?: string;
}

export interface MovieData extends FailedResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface MoviePoster {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface Masonry extends FailedResponse {
  Search?: MoviePoster[];
}

export interface FailedResponse {
  Response: string;
  Error?: string;
}
