import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";
import { Card, CardContent, CardFooter } from "../ui/card";
import { togglePlanToWatch } from "@/lib/indexedDB/functions";

type TogglePlanToWatchArgs = {
  movie: Movie;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
};

const RenderPlanToWatch = ({
  arg,
  hasPlan,
  togglePlanToWatch,
}: {
  hasPlan: boolean;
  arg: TogglePlanToWatchArgs;
  togglePlanToWatch: (arg: TogglePlanToWatchArgs) => void;
}) => {
  if (hasPlan) {
    return (
      <MdWatchLater
        className={cn(
          "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
        )}
        size={35}
        onClick={() => togglePlanToWatch(arg)}
      />
    );
  }
  return (
    <MdOutlineWatchLater
      className={cn(
        "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
      )}
      size={35}
      onClick={() => togglePlanToWatch(arg)}
    />
  );
};

type SomeProps = {
  bookmark?: 1 | 0;
  watchlater: 1 | 0;
  arg: TogglePlanToWatchArgs;
};

export const MovieCard = ({ arg, watchlater }: SomeProps) => {
  return (
    <Card key={arg.movie.id} className={cn("w-[230px] h-[430px]")}>
      <div className="flex justify-between">
        <div>
          {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
        </div>
        <div>
          <RenderPlanToWatch
            hasPlan={watchlater === 1 ? true : false}
            arg={arg}
            togglePlanToWatch={togglePlanToWatch}
          />
        </div>
      </div>
      <CardContent className={cn("flex items-center justify-center pt-2")}>
        <img
          loading="lazy"
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
            arg.movie.poster_path
              ? arg.movie.poster_path
              : arg.movie.backdrop_path
          }`}
          alt={`${arg.movie.title} image`}
        />
      </CardContent>
      <CardFooter className={cn("flex-initial items-center justify-center")}>
        <p>{arg.movie.title}</p>
      </CardFooter>
    </Card>
  );
};
