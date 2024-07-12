import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMovieList } from "../api/getMovieList";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { MovieListing } from "../components/custom/movieList";
import { MovieList } from "../types/movieList";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/indexedDB/db";
import { ToPTW } from "@/lib/utils";
import { togglePlanToWatch } from "@/lib/indexedDB/functions";
import { SearchParam } from "@/types/pagesearchparam";

export const Route = createFileRoute("/movies/nowplaying")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),

  component: () => <NowPlaying />,
});

const NowPlaying = () => {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setCurrentPage = (page: number) => {
    navigate({ search: () => ({ page }) });
  };
  const [movies, setMovies] = useState<MovieList>();

  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList(page));
    };
    tmp();
  }, [page]);

  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);

  const movieArchives = useLiveQuery(
    async () => ToPTW(await db.movieArchives.toArray()),
    [planToWatchTrigger]
  );
  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={movies.total_pages}
      />
      <MovieListing
        movies={movies}
        planToWatches={movieArchives}
        togglePlanToWatch={togglePlanToWatch}
        planToWatchTrigger={planToWatchTrigger}
        setPlanToWatchTrigger={setPlanToWatchTrigger}
      ></MovieListing>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={movies.total_pages}
      />
    </>
  );
};
