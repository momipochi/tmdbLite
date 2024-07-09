import { Movie } from "./movie";

export type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
