import { MovieList } from "../types/movieList";
import { basicFetch } from "./basicFetch";

export const getMovieList = async (page: number): Promise<MovieList> => {
  const resp = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}'`
  );
  if (!resp.ok) {
    throw new Error("couldn't get movie list");
  }
  return await resp.json();
};
