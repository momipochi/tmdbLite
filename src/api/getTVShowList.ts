import { TVShowList } from "@/types/tvshowlist";
import { basicFetch } from "./basicFetch";
import { preloadImage, PreloadImgArg } from "@/lib/utils";

export const getTVShowList = async (page: number): Promise<TVShowList> => {
  const resp = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`
  );
  if (!resp.ok) {
    throw new Error("couldn't fetch tvshows");
  }
  const res: TVShowList = await resp.json();
  await preloadImage(
    res.results.reduce((acc, curr) => {
      acc.push({
        id: curr.id,
        img: curr.poster_path ? curr.poster_path : curr.backdrop_path,
      });
      return acc;
    }, [] as PreloadImgArg[])
  );
  return res;
};
