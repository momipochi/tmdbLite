import { ImagePreload } from "@/types/imagePreload";
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

export type PreloadImgArg = { id: number; img: string | undefined | null };
export const preloadImage = (arr: PreloadImgArg[] | undefined) => {
  if (!arr) {
    return new Promise((resolve) => {
      resolve({});
    });
  }
  const prom = arr.map((x) => {
    return new Promise<{ id: number; img: string }>((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = `https://media.themoviedb.org/t/p/w220_and_h330_face${x.img}`;
      loadImg.onload = () => {
        resolve({ id: x.id, img: loadImg.src });
      };
      loadImg.onerror = (err) => {
        reject(err);
      };
    });
  });

  Promise.all(prom)
    .then((r) => {
      let res: ImagePreload = {};
      r.forEach(({ id, img }) => {
        res[id] = img;
      });
      return res;
    })
    .catch((err) => console.log(err));
};
