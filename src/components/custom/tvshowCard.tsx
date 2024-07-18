import { cn } from "@/lib/utils";
import { TVShow } from "@/types/tvshow";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  toggleBookmarkTV,
  togglePlanToWatchTV,
} from "@/lib/indexedDB/functions";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

export type TVShowCardProp = {
  bookmark: 1 | 0;
  watchlater: 1 | 0;
  tvshow: TVShow;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
  setBookmarkTrigger: (x: boolean) => void;
  bookmarkTrigger: boolean;
};

const RenderActions = ({
  watchlater,
  bookmark,
  tvshow,
  setPlanToWatchTrigger,
  planToWatchTrigger,
  setBookmarkTrigger,
  bookmarkTrigger,
}: TVShowCardProp) => {
  return (
    <>
      <div>
        {bookmark === 0 ? (
          <GoBookmark
            className={cn(
              "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
            )}
            size={35}
            onClick={() =>
              toggleBookmarkTV({
                tv: tvshow,
                setBookmarkTrigger,
                bookmarkTrigger,
              })
            }
          />
        ) : (
          <GoBookmarkFill
            className={cn(
              "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
            )}
            size={35}
            onClick={() =>
              toggleBookmarkTV({
                tv: tvshow,
                setBookmarkTrigger,
                bookmarkTrigger,
              })
            }
          />
        )}
      </div>
      <div>
        {watchlater === 0 ? (
          <MdOutlineWatchLater
            className={cn(
              "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
            )}
            size={35}
            onClick={() =>
              togglePlanToWatchTV({
                tv: tvshow,
                setPlanToWatchTrigger,
                planToWatchTrigger,
              })
            }
          />
        ) : (
          <MdWatchLater
            className={cn(
              "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
            )}
            size={35}
            onClick={() =>
              togglePlanToWatchTV({
                tv: tvshow,
                setPlanToWatchTrigger,
                planToWatchTrigger,
              })
            }
          />
        )}
      </div>
    </>
  );
};

export const TVShowCard = ({
  watchlater,
  bookmark,
  tvshow,
  setPlanToWatchTrigger,
  planToWatchTrigger,
  setBookmarkTrigger,
  bookmarkTrigger,
}: TVShowCardProp) => {
  return (
    <Card key={tvshow.id} className={cn("w-[230px] h-[350px] p-2")}>
      <CardContent className={cn("flex items-center justify-center pt-6")}>
        <img
          loading="lazy"
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
            tvshow.poster_path ? tvshow.poster_path : tvshow.backdrop_path
          }`}
          alt={`${tvshow.name} image`}
        />
        <div className="flex-row mb-auto">
          <RenderActions
            watchlater={watchlater}
            bookmark={bookmark}
            tvshow={tvshow}
            setPlanToWatchTrigger={setPlanToWatchTrigger}
            planToWatchTrigger={planToWatchTrigger}
            setBookmarkTrigger={setBookmarkTrigger}
            bookmarkTrigger={bookmarkTrigger}
          />
        </div>
      </CardContent>
      <CardFooter className={cn("flex-initial items-center justify-center")}>
        <p>{tvshow.name}</p>
      </CardFooter>
    </Card>
  );
};
