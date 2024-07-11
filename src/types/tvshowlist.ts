import { TVShow } from "./tvshow";

export type TVShowList = {
  total_pages: number;
  total_results: number;
  results: TVShow[];
  page: number;
};
