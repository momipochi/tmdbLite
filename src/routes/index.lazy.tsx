import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { cn, PTW, PTWTVShow, ToPTW, ToPTWTVShows } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getWatchLaterMovieArchives,
  getWatchLaterTVArchives,
} from "@/lib/indexedDB/functions";
import { MovieCard } from "@/components/custom/movieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TVShowCard } from "@/components/custom/tvshowCard";
import React from "react";
import { MovieArchive } from "@/types/movieArchive";
import { TVShowArchive } from "@/types/tvShowArchive";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const StyledLink: React.FC<{
  to: string;
  search?: any;
  text: string;
  className?: string;
}> = ({ className, to, search, text }) => {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1 p-5 border",
        className
      )}
    >
      {text}
    </Link>
  );
};
const PlansToWatch = ({
  movieArchives,
  ptw,
  tvArchives,
  ptwTV,
  setPlanToWatchTrigger,
  planToWatchTrigger,
  setPlanToWatchTriggerTV,
  planToWatchTriggerTV,
  setBookmarkTV,
  bookmarkTriggerTV,
}: {
  movieArchives: MovieArchive[] | undefined;
  ptw: PTW | undefined;
  tvArchives: TVShowArchive[] | undefined;
  ptwTV: PTWTVShow | undefined;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
  setPlanToWatchTriggerTV: (x: boolean) => void;
  planToWatchTriggerTV: boolean;
  setBookmarkTV: (x: boolean) => void;
  bookmarkTriggerTV: boolean;
}) => {
  return (
    <div className="justify-start content-center">
      <Tabs defaultValue="movies">
        <div className="flex mb-2">
          <TabsList>
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="shows">Shows</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="p-4 whitespace-nowrap rounded-md border ">
          <TabsContent value="movies">
            <ul className={cn("flex  space-x-4 p-4 h-[580px]")}>
              {!movieArchives || (movieArchives && movieArchives.length < 1) ? (
                <figure className="m-auto">
                  <StyledLink
                    to="/movies/nowplaying"
                    search={{ page: 1 }}
                    text="Discover movies!"
                  />
                </figure>
              ) : (
                movieArchives?.map((x) => (
                  <figure key={x.id} className="mt-auto mb-auto">
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
                ))
              )}
            </ul>
          </TabsContent>
          <TabsContent value="shows">
            <ul className={cn("flex  space-x-4 p-4 h-[580px]")}>
              {!tvArchives || (tvArchives && tvArchives.length < 1) ? (
                <figure className="m-auto">
                  <StyledLink
                    to="/tvshows/airingtoday"
                    search={{ page: 1 }}
                    text="Discover tvshows!"
                  />
                </figure>
              ) : (
                tvArchives?.map((x) => (
                  <figure key={x.id} className="mt-auto mb-auto">
                    <TVShowCard
                      watchlater={
                        ptwTV && ptwTV[x.tvshow.id]?.watchlater === 1 ? 1 : 0
                      }
                      bookmark={
                        ptwTV && ptwTV[x.tvshow.id]?.bookmakred === 1 ? 1 : 0
                      }
                      tvshow={x.tvshow}
                      setPlanToWatchTrigger={setPlanToWatchTriggerTV}
                      planToWatchTrigger={planToWatchTriggerTV}
                      setBookmarkTrigger={setBookmarkTV}
                      bookmarkTrigger={bookmarkTriggerTV}
                    />
                  </figure>
                ))
              )}
            </ul>
          </TabsContent>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>
  );
};
function Index() {
  const [planToWatchTrigger, setPlanToWatchTrigger] = useState(false);
  const [planToWatchTriggerTV, setPlanToWatchTriggerTV] = useState(false);
  const [bmrkTriggerTV, setBmrkTriggerTV] = useState(false);
  const movieArchives = useLiveQuery(
    async () => await getWatchLaterMovieArchives(),
    [planToWatchTrigger]
  );
  const tvArchives = useLiveQuery(
    async () => await getWatchLaterTVArchives(),
    [planToWatchTriggerTV, bmrkTriggerTV]
  );
  const ptw = ToPTW(movieArchives);
  const ptwTV = ToPTWTVShows(tvArchives);

  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex-row items-start justify-start">
        <h1 className="text-left pb-8 w-full font-medium text-5xl">
          Welcome to TMDBLite, a personal movie and TV show tracker. Discover,
          bookmark, and rate contents — all stored locally in the browser.
        </h1>
      </div>
      <div className="p-2 flex-row mb-12">
        <h2 className="text-left pb-2 w-full font-medium text-lg">
          Planning to watch
        </h2>
        <PlansToWatch
          tvArchives={tvArchives}
          movieArchives={movieArchives}
          ptw={ptw}
          ptwTV={ptwTV}
          setPlanToWatchTrigger={setPlanToWatchTrigger}
          setPlanToWatchTriggerTV={setPlanToWatchTriggerTV}
          planToWatchTrigger={planToWatchTrigger}
          planToWatchTriggerTV={planToWatchTriggerTV}
          setBookmarkTV={setBmrkTriggerTV}
          bookmarkTriggerTV={bmrkTriggerTV}
        />
      </div>
    </div>
  );
}
