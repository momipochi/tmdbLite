import { SearchParam } from "@/types/pagesearchparam";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tvshows/airingtoday")({
  validateSearch: (search: Record<string, unknown>): SearchParam => ({
    page: Number(search?.page ?? 1),
  }),
  component: () => <AiringToday />,
});

const AiringToday = () => {
  return <div>Hello airing today</div>;
};
