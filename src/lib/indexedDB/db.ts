import { MovieArchive } from "@/types/movieArchive";
import { TVShowArchive } from "@/types/tvShowArchive";
import Dexie, { EntityTable } from "dexie";

const db = new Dexie("TMDBLiteDatabase") as Dexie & {
  movieArchives: EntityTable<MovieArchive, "id">;
  tvshowArchives: EntityTable<TVShowArchive, "id">;
};

db.version(1).stores({
  movieArchives:
    "++id,bookmarked,watchlater,watched,bookmarkDateAdded,watchlaterDateAdded,personalRating,movie.adult, movie.backdrop_path, movie.genre_ids, movie.id, movie.original_language, movie.original_title, movie.overview, movie.popularity, movie.poster_path, movie.release_date, movie.title, movie.video, movie.vote_average, movie.vote_count",
  tvshowArchives:
    "++id,bookmarked,watchlater,watched,bookmarkDateAdded,watchlaterDateAdded,personalRating,tvshow.adult, tvshow.backdrop_path, tvshow.genre_ids, tvshow.id, tvshow.origin_country, tvshow.original_language, tvshow.original_name, tvshow.overview, tvshow.popularity, tvshow.poster_path, tvshow.first_air_date, tvshow.name, tvshow.vote_average, tvshow.vote_count",
});

export { db };
