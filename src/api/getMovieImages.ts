import { basicFetch } from "./basicFetch";

export const getMovieImages = async (movieId: number) => {
  const resp = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/movie/${movieId}/images`
  );
  const res = await resp.json();
  console.log(res);
  return res;
};
