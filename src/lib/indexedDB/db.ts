import { MovieArchive } from "@/types/movieArchive";
import Dexie, { EntityTable } from "dexie";

const db = new Dexie("TMDBLiteDatabase") as Dexie & {
  movieArchives: EntityTable<MovieArchive, "id">;
};

db.version(1).stores({
  movieArchives:
    "++id,bookmarked,watchlater,watched,bookmarkDateAdded,watchlaterDateAdded,personalRating,movie.adult, movie.backdrop_path, movie.genre_ids, movie.id, movie.original_language, movie.original_title, movie.overview, movie.popularity, movie.poster_path, movie.release_date, movie.title, movie.video, movie.vote_average, movie.vote_count",
});

export { db };
