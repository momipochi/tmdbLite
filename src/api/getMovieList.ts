import { preloadImage, PreloadImgArg } from "@/lib/utils";
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
  const res: MovieList = await resp.json();
  await preloadImage(
    res.results.reduce((acc, curr) => {
      acc.push({
        id: curr.id,
        img: curr.poster_path ? curr.poster_path : curr.backdrop_path,
      });
      return acc;
    }, [] as PreloadImgArg[])
  );
  return res;
};
