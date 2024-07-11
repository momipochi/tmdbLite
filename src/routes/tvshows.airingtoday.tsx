import { getTVShowList } from "@/api/getTVShowList";
import { SearchParam } from "@/types/pagesearchparam";
import { TVShowList } from "@/types/tvshowlist";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/tvshows/airingtoday")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),
  component: () => <AiringToday />,
});

const AiringToday = () => {
  const { page } = Route.useSearch();

  const [shows, setShows] = useState<TVShowList>();
  useEffect(() => {
    const call = async () => {
      setShows(await getTVShowList(page));
    };
    call();
  }, []);
  console.log(shows);
  return <div>Hello this feature is not ready yet</div>;
};
