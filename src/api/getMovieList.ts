import { MovieList } from "../types/movieList";
import { basicFetch } from "./basicFetch";

export const getMovieList = async (): Promise<MovieList> => {
  const resp = await basicFetch(
    "GET",
    "https://api.themoviedb.org/3/discover/movie"
  );
  if (!resp.ok) {
    throw new Error("couldn't get movie list");
  }
  const res = await resp.json();
  console.log(res);
  return res;
};
