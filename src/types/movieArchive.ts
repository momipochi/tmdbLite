import { Movie } from "./movie";

export type MovieArchive = {
  id: number;
  bookmakred: 1 | 0;
  watchlater: 1 | 0;
  watched: 1 | 0;
  bookmarkDateAdded: Date;
  watchlaterDateAdded: Date;
  personalRating: number;
  movie: Movie;
};
