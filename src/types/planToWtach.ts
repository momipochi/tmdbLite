import { Movie } from "./movie";

export type PersonalRating = {
  id: number;
  movieId: number;
  rating: number;
};

export type PlanToWatch = {
  id: number;
  watched: boolean;
  dateAdded: Date;
  personalRating: number;
  movie: Movie;
};

export type BookMark = {
  id: number;
  dateAdded: Date;
  movie: Movie;
};

export type MovieArchive = {
  id: number;
  bookmakred: boolean;
  watchlater: boolean;
  watched: boolean;
  bookmarkDateAdded: Date;
  watchlaterDateAdded: Date;
  personalRating: number;
  movie: Movie;
};
