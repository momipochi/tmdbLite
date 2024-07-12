import { MovieArchive } from "@/types/movieArchive";
import { TVShowArchive } from "@/types/tvShowArchive";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ToPTW = (movieArchives: MovieArchive[] | undefined) => {
  return movieArchives?.reduce((acc, curr) => {
    acc[curr.movie.id] = curr;
    return acc;
  }, {} as PTW);
};

export const ToPTWTVShows = (tv: TVShowArchive[] | undefined) => {
  return tv?.reduce((acc, curr) => {
    acc[curr.tvshow.id] = curr;
    return acc;
  }, {} as PTWTVShow);
};

export type PTWTVShow = {
  [id: number]: TVShowArchive | undefined;
};
export type PTW = {
  [id: number]: MovieArchive | undefined;
};
