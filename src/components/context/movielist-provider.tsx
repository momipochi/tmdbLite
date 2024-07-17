import { MovieArchive } from "@/types/movieArchive";
import { createContext, useContext, useEffect, useState } from "react";
import { useMovieArchiveContext } from "./moviearchive-provider";
import { PTW, ToPTW } from "@/lib/utils";
import { MovieList } from "@/types/movieList";
import { getMovieList } from "@/api/getMovieList";

type MovieArchiveState = {
  movielist: MovieList | undefined;
  movieArchiveMap: { [id: number]: MovieArchive | undefined } | undefined;
  watchlaterTrigger: boolean;
  setWatchlaterTrigger: (state: boolean) => void;
  bookmarkTrigger: boolean;
  setBookmarkTrigger: (state: boolean) => void;
  page: number;
  setPage: (page: number) => void;
};

const MovieArchivesContextInitialState: MovieArchiveState = {
  movielist: { total_pages: 0, total_results: 0, page: 0, results: [] },
  movieArchiveMap: {},
  watchlaterTrigger: false,
  setWatchlaterTrigger: () => {},
  bookmarkTrigger: false,
  setBookmarkTrigger: () => {},
  page: 1,
  setPage: () => {},
};

export const MovieArchivesContext = createContext<MovieArchiveState>(
  MovieArchivesContextInitialState
);

export const MovielistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    movieArchive,
    watchlaterTrigger,
    setWatchlaterTrigger,
    bookmarkTrigger,
    setBookmarkTrigger,
  } = useMovieArchiveContext();
  const [page, setPage] = useState(-1);
  const [movieArchiveMap, setMovieArchiveMap] = useState<PTW | undefined>({});
  const [movielist, setMovielist] = useState<MovieList>();
  useEffect(() => {
    setMovieArchiveMap(ToPTW(movieArchive));
  }, [watchlaterTrigger, bookmarkTrigger, movieArchive]);
  useEffect(() => {
    const call = async () => {
      setMovielist(await getMovieList(page));
    };
    if (page > 0) {
      call();
    }
  }, [page]);
  return (
    <MovieArchivesContext.Provider
      value={{
        movielist,
        movieArchiveMap,
        watchlaterTrigger,
        setWatchlaterTrigger,
        bookmarkTrigger,
        setBookmarkTrigger,
        page,
        setPage,
      }}
    >
      {children}
    </MovieArchivesContext.Provider>
  );
};

export const useMovielistContext = (
  page: number,
  dependencies: React.DependencyList = []
) => {
  const context = useContext(MovieArchivesContext);
  if (context === undefined)
    throw new Error(
      "useMovielistContext must be used within MovielistProvider"
    );
  useEffect(() => {
    context.setPage(page);
  }, dependencies);
  return context;
};
