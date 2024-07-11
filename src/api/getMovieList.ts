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
  const r = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
  );
  if (r.ok) {
    const tmp = await r.json();
    console.log("TV");
    console.log(tmp);
  }
  const res = await resp.json();
  console.log(res);
  return res;
};
