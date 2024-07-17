import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DiscoverPagination } from "../components/custom/discover-pagination";
import { cn } from "@/lib/utils";
import { SearchParam } from "@/types/pagesearchparam";
import { MovieCard } from "@/components/custom/movieCard";
import {
  MovielistProvider,
  useMovielistContext,
} from "@/components/context/movielist-provider";
import { MovieArchivesProvider } from "@/components/context/moviearchive-provider";

export const Route = createFileRoute("/movies/nowplaying")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),

  component: () => (
    <MovieArchivesProvider>
      <MovielistProvider>
        <NowPlaying />
      </MovielistProvider>
    </MovieArchivesProvider>
  ),
});

const NowPlaying = () => {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setCurrentPage = (page: number) => {
    navigate({ search: () => ({ page }) });
  };
  const mv = useMovielistContext(page, [page]);
  if (!mv.movielist) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={mv.movielist.total_pages}
      />
      <div className={cn("grid-cols-5 grid gap-2")}>
        {mv.movielist.results.map((x) => (
          <MovieCard
            key={x.id}
            watchlater={
              mv.movieArchiveMap && mv.movieArchiveMap[x.id]?.watchlater === 1
                ? 1
                : 0
            }
            bookmark={
              mv.movieArchiveMap && mv.movieArchiveMap[x.id]?.bookmakred === 1
                ? 1
                : 0
            }
            arg={{
              movie: x,
              setPlanToWatchTrigger: mv.setWatchlaterTrigger,
              planToWatchTrigger: mv.bookmarkTrigger,
              setBookmarkTrigger: mv.setBookmarkTrigger,
              bookmarkTrigger: mv.bookmarkTrigger,
            }}
          />
        ))}
      </div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={mv.movielist.total_pages}
      />
    </div>
  );
};
