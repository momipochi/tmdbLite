import { Movie } from "./movie";

export type PlanToWatch = {
  id: number;
  watched: boolean;
  dateAdded: Date;
  personalRating: number;
  movie: Movie;
};
