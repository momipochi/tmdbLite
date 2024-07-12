import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { cn, ToPTW, ToPTWTVShows } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getWatchLaterMovieArchives,
  getWatchLaterTVArchives,
} from "@/lib/indexedDB/functions";
import { MovieCard } from "@/components/custom/movieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TVShowCard } from "@/components/custom/tvshowCard";

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

function Index() {
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const [planToWatchTriggerTV, setPlanToWatchTriggerTV] = useState(false);
  const movieArchives = useLiveQuery(
    async () => await getWatchLaterMovieArchives(),
    [planToWatchTrigger]
  );
  const tvArchives = useLiveQuery(
    async () => await getWatchLaterTVArchives(),
    [planToWatchTriggerTV]
  );
  const ptw = ToPTW(movieArchives);
  const ptwTV = ToPTWTVShows(tvArchives);
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
      <div>
        <Tabs defaultValue="movies" className="wf">
          <div className="flex mb-2">
            <TabsList>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="shows">Shows</TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="p-4 whitespace-nowrap rounded-md border h-[550px]">
            <TabsContent value="movies">
              <ul className={cn("flex w-max space-x-4 p-4 ")}>
                {movieArchives?.map((x) => (
                  <figure key={x.id} className="shrink-0">
                    <MovieCard
                      watchlater={
                        ptw && ptw[x.movie.id]?.watchlater === 1 ? 1 : 0
                      }
                      arg={{
                        movie: x.movie,
                        setPlanToWatchTrigger,
                        planToWatchTrigger,
                      }}
                    />
                  </figure>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shows">
              <ul className={cn("flex w-max space-x-4 p-4 ")}>
                {tvArchives?.map((x) => (
                  <figure key={x.id} className="shrink-0">
                    <TVShowCard
                      watchlater={
                        ptwTV && ptwTV[x.tvshow.id]?.watchlater === 1 ? 1 : 0
                      }
                      tvshow={x.tvshow}
                      setPlanToWatchTrigger={setPlanToWatchTriggerTV}
                      planToWatchTrigger={planToWatchTriggerTV}
                    />
                  </figure>
                ))}
              </ul>
            </TabsContent>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex-row items-start justify-start">
        <h1 className="text-left pb-8 w-full font-medium text-5xl">
          Welcome to TMDBLite, a personal movie and TV show tracker. Discover,
          bookmark, and rate contents — all stored locally in the browser.
        </h1>
      </div>
      <div className="p-2 flex-row items-start justify-start mb-12">
        <h2 className="text-left pb-2 w-full font-medium text-lg">
          Planning to watch
        </h2>
        <PlansToWatch />
      </div>
    </div>
  );
}
