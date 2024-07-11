import { TVShowList } from "@/types/tvshowlist";
import { basicFetch } from "./basicFetch";

export const getTVShowList = async (page: number): Promise<TVShowList> => {
  const resp = await basicFetch(
    "GET",
    `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`
  );
  if (!resp.ok) {
    throw new Error("couldn't fetch tvshows");
  }
  return await resp.json();
};
