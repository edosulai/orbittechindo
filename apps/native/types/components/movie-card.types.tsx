import { MoviePoster } from "@/types";
import { ImageProps } from "react-native";

export interface MovieCardProps extends ImageProps {
  movie: MoviePoster;
  handleMovieClick: (imdbID: string) => void;
}
