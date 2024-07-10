import { ReduceToPTW } from "@/components/custom/movieList";
import { db } from "@/lib/indexedDB/db";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SomeCard } from "@/components/custom/movieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const planToWatches = useLiveQuery(
    () => db.planToWatches.toArray(),
    [planToWatchTrigger]
  );

  const PlansToWatch = () => {
    if (!planToWatches) {
      return (
        <div className=" p-4 rounded-md border">
          <Link
            to="/discover/nowplaying"
            search={{ page: 1 }}
            className="rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1 p-1 border-2"
          >
            Start discovering!
          </Link>
        </div>
      );
    }
    if (planToWatches.length < 1) {
      return (
        <div className=" p-4 rounded-md border">
          <Link
            className="rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1 p-1 border-2"
            to="/discover/nowplaying"
            search={{ page: 1 }}
          >
            Start discovering!
          </Link>
        </div>
      );
    }
    return (
      <ScrollArea className="p-4 whitespace-nowrap rounded-md border">
        <ul className={cn("flex w-max space-x-4 p-4")}>
          {planToWatches?.map((x) => (
            <figure key={x.id} className="shrink-0">
              <SomeCard
                exists={ptw && ptw[x.movie.id] ? true : false}
                arg={{
                  movie: x.movie,
                  setPlanToWatchTrigger,
                  planToWatchTrigger,
                }}
              />
            </figure>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  };
  const ptw = ReduceToPTW(planToWatches);

  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex-row items-start justify-start mb-12">
        <h1 className="text-left pb-8 w-full font-medium text-6xl">
          Welcome to TMDBLite, a client-side only movie archiving website.
        </h1>
      </div>
      <div className="p-2 flex-row items-start justify-start mb-12">
        <h2 className="text-left pb-8 w-full font-medium text-lg">
          Planning to watch
        </h2>
        <PlansToWatch />
      </div>
    </div>
  );
}
