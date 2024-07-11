import { PlanToWatch } from "@/types/planToWtach";
import Dexie, { EntityTable } from "dexie";

const db = new Dexie("TMDBLiteDatabase") as Dexie & {
  planToWatches: EntityTable<PlanToWatch, "id">;
};

db.version(1).stores({
  planToWatches:
    "++id,watched,dateAdded,personalRating,movie.adult, movie.backdrop_path, movie.genre_ids, movie.id, movie.original_language, movie.original_title, movie.overview, movie.popularity, movie.poster_path, movie.release_date, movie.title, movie.video, movie.vote_average, movie.vote_count",
});

export { db };
