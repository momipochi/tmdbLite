import { TVShow } from "@/types/tvshow";

export type ContentProp = {
  id: number;
  title: string;
  bookmark: 1 | 0;
  watchlater: 1 | 0;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};

export const TVShowCard = ({ content }: { content: TVShow | undefined }) => {};
