import { db } from "@/lib/indexedDB/db";
import { MovieArchive } from "@/types/movieArchive";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useState } from "react";

type MovieArchiveState = {
  movieArchive: MovieArchive[] | undefined;
  watchlaterTrigger: boolean;
  setWatchlaterTrigger: (state: boolean) => void;
  bookmarkTrigger: boolean;
  setBookmarkTrigger: (state: boolean) => void;
};

export const MovieArchiveContext = createContext<MovieArchiveState>({
  movieArchive: [],
  watchlaterTrigger: false,
  setWatchlaterTrigger: () => {},
  bookmarkTrigger: false,
  setBookmarkTrigger: () => {},
});

export const MovieArchivesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlaterTrigger, setWatchlaterTrigger] = useState(false);
  const [bookmarkTrigger, setBookmarkTrigger] = useState(false);
  const movieArchive = useLiveQuery(
    async () => await db.movieArchives.toArray(),
    [watchlaterTrigger, bookmarkTrigger]
  );
  return (
    <MovieArchiveContext.Provider
      value={{
        movieArchive,
        watchlaterTrigger,
        setWatchlaterTrigger,
        bookmarkTrigger,
        setBookmarkTrigger,
      }}
    >
      {children}
    </MovieArchiveContext.Provider>
  );
};

export const useMovieArchiveContext = () => {
  const context = useContext(MovieArchiveContext);
  if (context === undefined)
    throw new Error(
      "useMovieArchive must be used within MovieArchivesProvider"
    );
  return context;
};
