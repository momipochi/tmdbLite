import { TVArchiveProvider } from "@/components/context/tvarchive-provider";
import {
  TVShowlistProvider,
  useTVShowlistContext,
} from "@/components/context/tvshowlist-provider";
import { DiscoverPagination } from "@/components/custom/discover-pagination";
import { TVShowCard } from "@/components/custom/tvshowCard";
import { cn } from "@/lib/utils";
import { SearchParam } from "@/types/pagesearchparam";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/tvshows/airingtoday")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),
  component: () => (
    <TVArchiveProvider>
      <TVShowlistProvider>
        <AiringToday />
      </TVShowlistProvider>
    </TVArchiveProvider>
  ),
});

const AiringToday = () => {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setCurrentPage = (page: number) => {
    navigate({ search: () => ({ page }) });
  };
  const tv = useTVShowlistContext(page, [page]);
  if (!tv.tvShowlist) {
    return <></>;
  }
  return (
    <div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={tv.tvShowlist.total_pages}
      />
      <div className={cn("grid-cols-5 grid gap-2")}>
        {tv.tvShowlist?.results.map((x) => (
          <TVShowCard
            key={x.id}
            tvshow={x}
            watchlater={
              tv.tvArchiveMap && tv.tvArchiveMap[x.id]?.watchlater === 1 ? 1 : 0
            }
            bookmark={
              tv.tvArchiveMap && tv.tvArchiveMap[x.id]?.bookmakred === 1 ? 1 : 0
            }
            setPlanToWatchTrigger={tv.setWatchlaterTrigger}
            planToWatchTrigger={tv.watchlaterTrigger}
            setBookmarkTrigger={tv.setBookmarkTrigger}
            bookmarkTrigger={tv.bookmarkTrigger}
          />
        ))}
      </div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={tv.tvShowlist.total_pages}
      />
    </div>
  );
};
