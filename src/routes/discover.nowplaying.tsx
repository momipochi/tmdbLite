import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMovieList } from "../api/getMovieList";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { MovieListing } from "../components/custom/movieList";
import { MovieList } from "../types/movieList";

type NowPlayingSearchParam = {
  page: number;
};

export const Route = createFileRoute("/discover/nowplaying")({
  validateSearch: (search: Record<string, unknown>): NowPlayingSearchParam => ({
    page: Number(search?.page ?? 1),
  }),

  component: () => <NowPlaying />,
});

const NowPlaying = () => {
  const { page } = Route.useSearch();
  const [movies, setMovies] = useState<MovieList>();
  const navigate = useNavigate({ from: Route.fullPath });
  const setCurrentPage = (page: number) => {
    navigate({ search: () => ({ page }) });
  };
  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList(page));
    };
    tmp();
  }, [page]);

  if (!movies) {
    return;
  }
  return (
    <>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        movies={movies}
      />
      <MovieListing movies={movies}></MovieListing>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        movies={movies}
      />
    </>
  );
};
