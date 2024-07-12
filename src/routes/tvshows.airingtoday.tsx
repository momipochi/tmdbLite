import { getTVShowList } from "@/api/getTVShowList";
import { DiscoverPagination } from "@/components/custom/discover-pagination";
import { TVShowCard } from "@/components/custom/tvshowCard";
import { cn } from "@/lib/utils";
import { SearchParam } from "@/types/pagesearchparam";
import { TVShowList } from "@/types/tvshowlist";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tvshows/airingtoday")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),
  component: () => <AiringToday />,
});

const AiringToday = () => {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const setCurrentPage = (page: number) => {
    navigate({ search: () => ({ page }) });
  };
  const [shows, setShows] = useState<TVShowList>();
  useEffect(() => {
    const call = async () => {
      setShows(await getTVShowList(page));
    };
    call();
  }, [page]);
  if (!shows) {
    return <></>;
  }
  return (
    <div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={shows.total_pages}
      />
      <div className={cn("grid-cols-5 grid gap-2")}>
        {shows?.results.map((x) => (
          <TVShowCard
            tvshow={x}
            watchlater={1}
            setPlanToWatchTrigger={() => {}}
            planToWatchTrigger={false}
          ></TVShowCard>
        ))}
      </div>
      <DiscoverPagination
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPages={shows.total_pages}
      />
    </div>
  );
};
