import {
  MovieListingPrimitive,
  ReduceToPTW,
} from "@/components/custom/movieList";
import { db } from "@/lib/indexedDB/db";
import { Movie } from "@/types/movie";
import { PlanToWatch } from "@/types/planToWtach";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { togglePlanToWatch } from "./discover.nowplaying";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const PTWToMovies = (x: PlanToWatch[] | undefined): Movie[] | undefined => {
  return x?.reduce((acc, curr) => {
    acc.push(curr.movie);
    return acc;
  }, [] as Movie[]);
};

function Index() {
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const planToWatches = useLiveQuery(
    () => db.planToWatches.toArray(),
    [planToWatchTrigger]
  );

  const reduce = PTWToMovies(planToWatches);
  const ptw = ReduceToPTW(planToWatches);
  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex items-start justify-start">
        <div className={cn("overflow-x-scroll")}>
          <h1 className="text-left pb-8 w-full">Planning to watch</h1>
          <div>
            <ul className={cn("flex space-x-24 ")}>
              <MovieListingPrimitive
                movies={reduce}
                planToWatches={ptw}
                planToWatchTrigger={planToWatchTrigger}
                setPlanToWatchTrigger={setPlanToWatchTrigger}
                togglePlanToWatch={togglePlanToWatch}
              />
            </ul>
          </div>
        </div>
      </div>
      <div>
        <span>Hello world</span>
      </div>
    </div>
  );
}
