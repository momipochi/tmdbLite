import { Movie } from "@/types/movie";

import { db } from "./db";
import { MovieArchive } from "@/types/movieArchive";
import { TVShow } from "@/types/tvshow";
import { TVShowArchive } from "@/types/tvShowArchive";

export const getWatchLaterMovieArchives = () => {
  return db.movieArchives.where("watchlater").equals(1).toArray();
};

export type TogglePlanToWatchArgs = {
  movie: Movie;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};
export const togglePlanToWatch = async (arg: TogglePlanToWatchArgs) => {
  const res = await db.movieArchives
    .where("movie.id")
    .equals(arg.movie.id)
    .toArray();

  if (!res || res.length > 1) {
    return;
  }
  if (res.length === 1) {
    if (res[0].watchlater === 1) {
      await db.movieArchives
        .where("movie.id")
        .equals(arg.movie.id)
        .modify({ watchlater: 0 });
    } else {
      await db.movieArchives
        .where("movie.id")
        .equals(arg.movie.id)
        .modify({ watchlater: 1 });
    }
  } else {
    await db.movieArchives.add({
      watchlater: 1,
      watchlaterDateAdded: new Date(),
      watched: 0,
      personalRating: 0,
      movie: arg.movie,
    } as MovieArchive);
  }
  arg.setPlanToWatchTrigger(!arg.planToWatchTrigger);
};

export type TogglePlanToWatchTVArgs = {
  tv: TVShow;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};

export const togglePlanToWatchTV = async (arg: TogglePlanToWatchTVArgs) => {
  const res = await db.tvshowArchives
    .where("tvshow.id")
    .equals(arg.tv.id)
    .toArray();
  if (!res || res.length > 1) {
    return;
  }
  if (res.length === 1) {
    if (res[0].watchlater === 1) {
      await db.tvshowArchives
        .where("tvshow.id")
        .equals(arg.tv.id)
        .modify({ watchlater: 0 });
    } else {
      await db.tvshowArchives
        .where("tvshow.id")
        .equals(arg.tv.id)
        .modify({ watchlater: 1 });
    }
  } else {
    await db.tvshowArchives.add({
      watchlater: 1,
      watchlaterDateAdded: new Date(),
      watched: 0,
      personalRating: 0,
      tvshow: arg.tv,
    } as TVShowArchive);
  }
};
