import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getMovieList } from "../api/getMovieList";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { MovieList } from "../types/movieList";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/indexedDB/db";
import { cn, ToPTW } from "@/lib/utils";
import { SearchParam } from "@/types/pagesearchparam";
import { MovieCard } from "@/components/custom/movieCard";

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
  const [bookmarkTrigger, setBookmarkTrigger] = useState(false);
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);

  const movieArchives = useLiveQuery(
    async () => ToPTW(await db.movieArchives.toArray()),
    [planToWatchTrigger]
  );
  if (!movies) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={movies.total_pages}
      />
      <div className={cn("grid-cols-5 grid gap-2")}>
        {movies?.results.map((x) => (
          <MovieCard
            key={x.id}
            watchlater={
              movieArchives && movieArchives[x.id]?.watchlater === 1 ? 1 : 0
            }
            bookmark={
              movieArchives && movieArchives[x.id]?.bookmakred === 1 ? 1 : 0
            }
            arg={{
              movie: x,
              setPlanToWatchTrigger,
              planToWatchTrigger,
              setBookmarkTrigger: setBookmarkTrigger,
              bookmarkTrigger: bookmarkTrigger,
            }}
          />
        ))}
      </div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={movies.total_pages}
      />
    </div>
  );
};
