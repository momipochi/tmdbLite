import { Movie } from "./movie";

export type PersonalRating = {
  id: number;
  rating: number;
};

export type PlanToWatch = {
  id: number;
  watched: boolean;
  dateAdded: Date;
  personalRating: number;
  movie: Movie;
};
