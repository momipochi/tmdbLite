import { basicFetch } from "./basicFetch";

export const getMovie = async (movieId: number) => {
  console.log("MovieID " + movieId);
  const resp = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/movie/${movieId}`
  );
  const res = await resp.json();
  console.log(res);
  return res;
};
