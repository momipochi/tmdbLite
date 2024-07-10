import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMovieList } from "../api/getMovieList";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { MovieListing, ReduceToPTW } from "../components/custom/movieList";
import { MovieList } from "../types/movieList";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/indexedDB/db";
import { Movie } from "@/types/movie";
import { PlanToWatch } from "@/types/planToWtach";

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
  const planToWatches = useLiveQuery(
    async () => ReduceToPTW(await db.planToWatches.toArray()),
    [planToWatchTrigger]
  );
  const togglePlanToWatch = async (movie: Movie) => {
    const res = await db.planToWatches
      .where("movie.id")
      .equals(movie.id)
      .toArray();
    console.log(res);
    if (!res || res.length > 1) {
      return;
    }
    if (res.length === 1) {
      await db.planToWatches.delete(res[0].id);
    } else {
      await db.planToWatches.add({
        watched: false,
        dateAdded: new Date(),
        personalRating: 0,
        movie: movie,
      } as PlanToWatch);
    }
    setPlanToWatchTrigger(!planToWatchTrigger);
  };
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
        planToWatches={planToWatches}
        togglePlanToWatch={togglePlanToWatch}
      ></MovieListing>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        movies={movies}
      />
    </>
  );
};
