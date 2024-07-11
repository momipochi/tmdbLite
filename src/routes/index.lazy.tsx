import { db } from "@/lib/indexedDB/db";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SomeCard } from "@/components/custom/movieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieArchive } from "@/types/planToWtach";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const StyledLink = ({
  to,
  search,
  text,
}: {
  to: string;
  search?: any;
  text: string;
}) => {
  return (
    <Link
      to={to}
      search={search}
      className="rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1 p-1 border-2"
    >
      {text}
    </Link>
  );
};

export type PTW = {
  [id: number]: MovieArchive | undefined;
};

export const ToPTW = (movieArchives: MovieArchive[] | undefined) => {
  return movieArchives?.reduce((acc, curr) => {
    acc[curr.movie.id] = curr;
    return acc;
  }, {} as PTW);
};
function Index() {
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const movieArchives = useLiveQuery(
    () => db.movieArchives.toArray(),
    [planToWatchTrigger]
  );
  const ptw = ToPTW(movieArchives);
  const PlansToWatch = () => {
    if (!movieArchives) {
      return (
        <div className=" p-4 rounded-md border">
          <StyledLink
            to="/discover/nowplaying"
            search={{ page: 1 }}
            text="Start discovering!"
          />
        </div>
      );
    }
    if (movieArchives.length < 1) {
      return (
        <div className=" p-4 rounded-md border">
          <StyledLink
            to="/discover/nowplaying"
            search={{ page: 1 }}
            text="Start discovering!"
          />
        </div>
      );
    }
    return (
      <ScrollArea className="p-4 whitespace-nowrap rounded-md border">
        <ul className={cn("flex w-max space-x-4 p-4")}>
          {movieArchives?.map((x) => (
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

  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex-row items-start justify-start mb-12">
        <h1 className="text-left pb-8 w-full font-medium text-5xl">
          Welcome to TMDBLite, a personal movie and TV show tracker. Discover,
          bookmark, and rate contents — all stored locally in the browser.
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
