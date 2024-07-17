import { db } from "@/lib/indexedDB/db";
import { TVShowArchive } from "@/types/tvShowArchive";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useState } from "react";

type TVArchiveState = {
  tvArchive: TVShowArchive[] | undefined;
  watchlaterTrigger: boolean;
  setWatchlaterTrigger: (state: boolean) => void;
  bookmarkTrigger: boolean;
  setBookmarkTrigger: (state: boolean) => void;
};

export const TVArchiveContext = createContext<TVArchiveState>({
  tvArchive: [],
  watchlaterTrigger: false,
  setWatchlaterTrigger: () => {},
  bookmarkTrigger: false,
  setBookmarkTrigger: () => {},
});

export const TVArchiveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [watchlaterTrigger, setWatchlaterTrigger] = useState(false);
  const [bookmarkTrigger, setBookmarkTrigger] = useState(false);
  const tvArchive = useLiveQuery(
    async () => await db.tvshowArchives.toArray(),
    [watchlaterTrigger, bookmarkTrigger]
  );

  return (
    <TVArchiveContext.Provider
      value={{
        tvArchive,
        watchlaterTrigger,
        setWatchlaterTrigger,
        bookmarkTrigger,
        setBookmarkTrigger,
      }}
    >
      {children}
    </TVArchiveContext.Provider>
  );
};

export const useTVArchiveContext = () => {
  const context = useContext(TVArchiveContext);
  if (context === undefined)
    throw new Error(
      "useTVArchiveContext must be used within TVArchiveProvider"
    );
  return context;
};
