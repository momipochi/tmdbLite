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
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const navigate = useNavigate({ from: Route.fullPath });
  const movieArchives = useLiveQuery(
    async () => ToPTW(await db.movieArchives.toArray()),
    [planToWatchTrigger]
  );

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
    return <div>Loading...</div>;
  }
  return (
    <>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        movies={movies}
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
        movies={movies}
      />
    </>
  );
};
