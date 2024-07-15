import { getTVShowList } from "@/api/getTVShowList";
import { DiscoverPagination } from "@/components/custom/discover-pagination";
import { TVShowCard } from "@/components/custom/tvshowCard";
import { db } from "@/lib/indexedDB/db";
import { cn, ToPTWTVShows } from "@/lib/utils";
import { SearchParam } from "@/types/pagesearchparam";
import { TVShowList } from "@/types/tvshowlist";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
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

  const [ptw, setPtw] = useState(false);
  const [bmrk, setBmrk] = useState(false);

  const tvarchives = useLiveQuery(
    async () => ToPTWTVShows(await db.tvshowArchives.toArray()),
    [ptw, bmrk]
  );
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
            key={x.id}
            tvshow={x}
            watchlater={
              tvarchives && tvarchives[x.id]?.watchlater === 1 ? 1 : 0
            }
            bookmark={tvarchives && tvarchives[x.id]?.bookmakred === 1 ? 1 : 0}
            setPlanToWatchTrigger={setPtw}
            planToWatchTrigger={ptw}
            setBookmarkTrigger={setBmrk}
            bookmarkTrigger={bmrk}
          />
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
