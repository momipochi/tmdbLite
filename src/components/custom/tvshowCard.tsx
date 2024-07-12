import { cn } from "@/lib/utils";
import { TVShow } from "@/types/tvshow";
import { Card, CardContent, CardFooter } from "../ui/card";
import { togglePlanToWatchTV } from "@/lib/indexedDB/functions";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";

export type TVShowCardProp = {
  bookmark?: 1 | 0;
  watchlater: 1 | 0;
  tvshow: TVShow;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};

const RenderPlanTowatch = ({
  watchlater,
  tvshow,
  setPlanToWatchTrigger,
  planToWatchTrigger,
}: TVShowCardProp) => {
  if (watchlater) {
    return (
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
    );
  }
  return (
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
  );
};

export const TVShowCard = ({
  watchlater,
  tvshow,
  setPlanToWatchTrigger,
  planToWatchTrigger,
}: TVShowCardProp) => {
  return (
    <Card key={tvshow.id} className={cn("w-[230px] h-[430px]")}>
      <div className="flex justify-between">
        <div>
          {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
        </div>
        <div>
          <RenderPlanTowatch
            watchlater={watchlater}
            tvshow={tvshow}
            setPlanToWatchTrigger={setPlanToWatchTrigger}
            planToWatchTrigger={planToWatchTrigger}
          />
        </div>
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
