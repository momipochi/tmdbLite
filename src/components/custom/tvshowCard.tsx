import { cn } from "@/lib/utils";
import { TVShow } from "@/types/tvshow";
import { Card, CardContent, CardFooter } from "../ui/card";

export type TVShowCardProp = {
  bookmark?: 1 | 0;
  watchlater: 1 | 0;
  tvshow: TVShow;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};

export const TVShowCard = ({ tvshow }: TVShowCardProp) => {
  return (
    <Card key={tvshow.id} className={cn("w-[230px] h-[430px]")}>
      <div className="flex justify-between">
        <div>
          {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
        </div>
        <div></div>
      </div>
      <CardContent className={cn("flex items-center justify-center pt-2")}>
        <img
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
            tvshow.poster_path ? tvshow.poster_path : tvshow.backdrop_path
          }`}
          alt={`${tvshow.name} image`}
        />
      </CardContent>
      <CardFooter className={cn("flex-initial items-center justify-center")}>
        <p>{tvshow.name}</p>
      </CardFooter>
    </Card>
  );
};
