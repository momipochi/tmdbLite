import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMovieList } from "../api/getMovieList";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { MovieListing } from "../components/custom/movieList";
import { MovieList } from "../types/movieList";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/indexedDB/db";
import { Movie } from "@/types/movie";
import { MovieArchive } from "@/types/planToWtach";
import { ToPTW } from "./index.lazy";

type NowPlayingSearchParam = {
  page: number;
};

export const Route = createFileRoute("/discover/nowplaying")({
  validateSearch: (search: Record<string, unknown>): NowPlayingSearchParam => ({
    page: Number(search?.page ?? 1),
  }),

  component: () => <NowPlaying />,
});

export type TogglePlanToWatchArgs = {
  movie: Movie;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};
export const togglePlanToWatch = async (arg: TogglePlanToWatchArgs) => {
  const res = await db.movieArchives
    .where("movie.id")
    .equals(arg.movie.id)
    .toArray();

  if (!res || res.length > 1) {
    return;
  }
  if (res.length === 1) {
    await db.movieArchives
      .where("movie.id")
      .equals(arg.movie.id)
      .modify({ watchlater: false });
  } else {
    await db.movieArchives.add({
      watchlater: true,
      watchlaterDateAdded: new Date(),
      watched: false,
      personalRating: 0,
      movie: arg.movie,
    } as MovieArchive);
  }
  arg.setPlanToWatchTrigger(!arg.planToWatchTrigger);
};
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
