import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn, PTW, PTWTVShow, ToPTW, ToPTWTVShows } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MovieCard } from "@/components/custom/movieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TVShowCard } from "@/components/custom/tvshowCard";
import React from "react";
import {
  TVArchiveProvider,
  useTVArchiveContext,
} from "@/components/context/tvarchive-provider";
import {
  MovieArchivesProvider,
  useMovieArchiveContext,
} from "@/components/context/moviearchive-provider";
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

const Some = ({
  movieArchive,
  tvArchive,
  setWatchlaterTrigger,
  watchlaterTrigger,
  setBookmarkTrigger,
  bookmarkTrigger,
  setWatchlaterTriggerTV,
  watchlaterTriggerTV,
  setBookmarkTriggerTV,
  bookmarkTriggerTV,
  tvMap,
  movieMap,
  section,
  tvFilter,
  movieFilter,
}: {
  movieArchive: MovieArchive[] | undefined;
  tvArchive: TVShowArchive[] | undefined;
  tvFilter: (tv: TVShowArchive) => boolean;
  movieFilter: (mv: MovieArchive) => boolean;
  setWatchlaterTrigger: (trigger: boolean) => void;
  watchlaterTrigger: boolean;
  setBookmarkTrigger: (trigger: boolean) => void;
  bookmarkTrigger: boolean;
  setWatchlaterTriggerTV: (trigger: boolean) => void;
  watchlaterTriggerTV: boolean;
  setBookmarkTriggerTV: (trigger: boolean) => void;
  bookmarkTriggerTV: boolean;
  tvMap: PTWTVShow | undefined;
  movieMap: PTW | undefined;
  section: string;
}) => {
  return (
    <div className="p-2 flex-row mb-2">
      <h2 className="text-left pb-2 w-full font-medium text-lg">{section}</h2>
      <div className="justify-start content-center">
        <Tabs defaultValue="movies">
          <div className="flex mb-2">
            <TabsList>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="shows">Shows</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="p whitespace-nowrap rounded-md border ">
            <TabsContent value="movies">
              <ul className={cn("flex  space-x-4 p-4 h-[480px]")}>
                {!movieArchive || (movieArchive && movieArchive.length < 1) ? (
                  <figure className="m-auto">
                    <StyledLink
                      to="/movies/nowplaying"
                      search={{ page: 1 }}
                      text="Discover movies!"
                    />
                  </figure>
                ) : (
                  movieArchive?.filter(movieFilter).map((x) => (
                    <figure key={x.id} className="mt-auto mb-auto">
                      <MovieCard
                        watchlater={
                          movieMap && movieMap[x.movie.id]?.watchlater === 1
                            ? 1
                            : 0
                        }
                        bookmark={
                          movieMap && movieMap[x.movie.id]?.bookmakred === 1
                            ? 1
                            : 0
                        }
                        arg={{
                          movie: x.movie,
                          setPlanToWatchTrigger: setWatchlaterTrigger,
                          planToWatchTrigger: watchlaterTrigger,
                          setBookmarkTrigger: setBookmarkTrigger,
                          bookmarkTrigger: bookmarkTrigger,
                        }}
                      />
                    </figure>
                  ))
                )}
              </ul>
            </TabsContent>
            <TabsContent value="shows">
              <ul className={cn("flex  space-x-4 p-4 h-[480px]")}>
                {!tvArchive || (tvArchive && tvArchive.length < 1) ? (
                  <figure className="m-auto">
                    <StyledLink
                      to="/tvshows/airingtoday"
                      search={{ page: 1 }}
                      text="Discover tvshows!"
                    />
                  </figure>
                ) : (
                  tvArchive?.filter(tvFilter).map((x) => (
                    <figure key={x.id} className="mt-auto mb-auto">
                      <TVShowCard
                        watchlater={
                          tvMap && tvMap[x.tvshow.id]?.watchlater === 1 ? 1 : 0
                        }
                        bookmark={
                          tvMap && tvMap[x.tvshow.id]?.bookmakred === 1 ? 1 : 0
                        }
                        tvshow={x.tvshow}
                        setPlanToWatchTrigger={setWatchlaterTriggerTV}
                        planToWatchTrigger={watchlaterTriggerTV}
                        setBookmarkTrigger={setBookmarkTriggerTV}
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
    </div>
  );
};

const IndexWrapper = () => {
  const tvArchiveContext = useTVArchiveContext();
  const movieArchiveContext = useMovieArchiveContext();
  const [ptw, setPtw] = useState(ToPTW(movieArchiveContext.movieArchive));
  const [ptwTV, setPtwTV] = useState(ToPTWTVShows(tvArchiveContext.tvArchive));
  useEffect(() => {
    setPtw(ToPTW(movieArchiveContext.movieArchive));
    setPtwTV(ToPTWTVShows(tvArchiveContext.tvArchive));
  }, [
    movieArchiveContext.movieArchive,
    tvArchiveContext.tvArchive,
    movieArchiveContext.bookmarkTrigger,
    movieArchiveContext.watchlaterTrigger,
    tvArchiveContext.bookmarkTrigger,
    tvArchiveContext.watchlaterTrigger,
  ]);
  return (
    <div className="p-2 flex-row items-start justify-start">
      <div className="p-2 flex-row items-start justify-start">
        <h1 className="text-left pb-8 w-full font-medium text-5xl">
          Welcome to TMDBLite, a personal movie and TV show tracker. Discover,
          bookmark, and rate contents — all stored locally in the browser.
        </h1>
        <Some
          tvArchive={tvArchiveContext.tvArchive}
          movieArchive={movieArchiveContext.movieArchive}
          tvFilter={(x) => x.watchlater === 1}
          movieFilter={(x) => x.watchlater === 1}
          tvMap={ptwTV}
          movieMap={ptw}
          setBookmarkTrigger={movieArchiveContext.setBookmarkTrigger}
          bookmarkTrigger={movieArchiveContext.bookmarkTrigger}
          setWatchlaterTrigger={movieArchiveContext.setWatchlaterTrigger}
          watchlaterTrigger={movieArchiveContext.watchlaterTrigger}
          setBookmarkTriggerTV={tvArchiveContext.setBookmarkTrigger}
          bookmarkTriggerTV={tvArchiveContext.bookmarkTrigger}
          setWatchlaterTriggerTV={tvArchiveContext.setWatchlaterTrigger}
          watchlaterTriggerTV={tvArchiveContext.watchlaterTrigger}
          section="Water later"
        />
        <Some
          tvArchive={tvArchiveContext.tvArchive}
          movieArchive={movieArchiveContext.movieArchive}
          tvFilter={(x) => x.bookmakred === 1}
          movieFilter={(x) => x.bookmakred === 1}
          tvMap={ptwTV}
          movieMap={ptw}
          setBookmarkTrigger={movieArchiveContext.setBookmarkTrigger}
          bookmarkTrigger={movieArchiveContext.bookmarkTrigger}
          setWatchlaterTrigger={movieArchiveContext.setWatchlaterTrigger}
          watchlaterTrigger={movieArchiveContext.watchlaterTrigger}
          setBookmarkTriggerTV={tvArchiveContext.setBookmarkTrigger}
          bookmarkTriggerTV={tvArchiveContext.bookmarkTrigger}
          setWatchlaterTriggerTV={tvArchiveContext.setWatchlaterTrigger}
          watchlaterTriggerTV={tvArchiveContext.watchlaterTrigger}
          section="Bookmarked"
        />
      </div>
    </div>
  );
};
function Index() {
  return (
    <TVArchiveProvider>
      <MovieArchivesProvider>
        <IndexWrapper />
      </MovieArchivesProvider>
    </TVArchiveProvider>
  );
}
