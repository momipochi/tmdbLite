import { Movie } from "@/types/movie";
import { MovieArchive } from "@/types/planToWtach";
import { db } from "./db";

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
