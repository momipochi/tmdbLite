import { MovieArchive } from "@/types/movieArchive";
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

export type PTW = {
  [id: number]: MovieArchive | undefined;
};
