import { getTVShowList } from "@/api/getTVShowList";
import { PTWTVShow, ToPTWTVShows } from "@/lib/utils";
import { TVShowArchive } from "@/types/tvShowArchive";
import { TVShowList } from "@/types/tvshowlist";
import { createContext, useContext, useEffect, useState } from "react";
import { useTVArchiveContext } from "./tvarchive-provider";

type TVArchiveState = {
  tvShowlist: TVShowList | undefined;
  tvArchiveMap: { [id: number]: TVShowArchive | undefined } | undefined;
  watchlaterTrigger: boolean;
  setWatchlaterTrigger: (state: boolean) => void;
  bookmarkTrigger: boolean;
  setBookmarkTrigger: (state: boolean) => void;
  page: number;
  setPage: (page: number) => void;
};

const TVArchivesContextInitialState: TVArchiveState = {
  tvShowlist: { total_pages: 0, total_results: 0, page: 0, results: [] },
  tvArchiveMap: {},
  watchlaterTrigger: false,
  setWatchlaterTrigger: () => {},
  bookmarkTrigger: false,
  setBookmarkTrigger: () => {},
  page: 1,
  setPage: () => {},
};

export const TVArchivesContext = createContext<TVArchiveState | undefined>(
  TVArchivesContextInitialState
);

export const TVShowlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    tvArchive,
    watchlaterTrigger,
    setWatchlaterTrigger,
    bookmarkTrigger,
    setBookmarkTrigger,
  } = useTVArchiveContext();
  const [page, setPage] = useState(-1);
  const [tvArchiveMap, setTVArchiveMap] = useState<PTWTVShow | undefined>({});
  const [tvShowlist, setTVShowlist] = useState<TVShowList>();
  useEffect(() => {
    setTVArchiveMap(ToPTWTVShows(tvArchive));
  }, [watchlaterTrigger, bookmarkTrigger, tvArchive]);

  useEffect(() => {
    const call = async () => {
      setTVShowlist(await getTVShowList(page));
    };
    if (page > 0) {
      call();
    }
  }, [page]);
  return (
    <TVArchivesContext.Provider
      value={{
        tvShowlist,
        tvArchiveMap,
        watchlaterTrigger,
        setWatchlaterTrigger,
        bookmarkTrigger,
        setBookmarkTrigger,
        page,
        setPage,
      }}
    >
      {children}
    </TVArchivesContext.Provider>
  );
};

export const useTVShowlistContext = (
  page: number,
  dependencies: React.DependencyList = []
) => {
  const context = useContext(TVArchivesContext);
  if (context === undefined)
    throw new Error(
      "useTVArchiveContext must be used within TVArchivesProvider"
    );
  useEffect(() => {
    context.setPage(page);
  }, dependencies);

  return context;
};
