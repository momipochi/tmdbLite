import { cn, PTW } from "../../lib/utils";
import { MovieList } from "@/types/movieList";
import { MovieCard } from "./movieCard";
import { TogglePlanToWatchArgs } from "@/lib/indexedDB/functions";

type MovieListingProps = {
  movies: MovieList | undefined;
  planToWatches: PTW | undefined;
  planToWatchTrigger: boolean;
  setPlanToWatchTrigger: (x: boolean) => void;
  togglePlanToWatch: (arg: TogglePlanToWatchArgs) => void;
};

export const MovieListing = ({
  movies,
  planToWatches,
  togglePlanToWatch,
  planToWatchTrigger,
  setPlanToWatchTrigger,
  ...props
}: MovieListingProps) => {
  return (
    <div className={cn("grid-cols-5 grid gap-2")} {...props}>
      {movies?.results.map((x) => (
        <MovieCard
          key={x.id}
          watchlater={
            planToWatches && planToWatches[x.id]?.watchlater === 1 ? 1 : 0
          }
          arg={{ movie: x, setPlanToWatchTrigger, planToWatchTrigger }}
        />
      ))}
    </div>
  );
};
