import { useState, useEffect } from "react";
import { getMovieList } from "../../api/getMovieList";
import { MovieList } from "../../types/movieList";
import { MovieListing } from "../movieList/movieList";
import { DiscoverPagination } from "./pagination";

export const Discover = () => {
  const [movies, setMovies] = useState<MovieList>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList(currentPage));
    };
    tmp();
  }, [currentPage]);

  if (!movies) {
    return;
  }
  return (
    <>
      <DiscoverPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        movies={movies}
      />
      <MovieListing movies={movies}></MovieListing>
    </>
  );
};
