import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import { MdWatchLater, MdOutlineWatchLater } from "react-icons/md";
import { Card, CardContent, CardFooter } from "../ui/card";
import { toggleBookmark, togglePlanToWatch } from "@/lib/indexedDB/functions";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

type TogglePlanToWatchArgs = {
  movie: Movie;
  setPlanToWatchTrigger: (x: boolean) => void;
  planToWatchTrigger: boolean;
  setBookmarkTrigger: (x: boolean) => void;
  bookmarkTrigger: boolean;
};

const RenderActions = ({
  arg,
  watchlater,
  bookmark,
}: {
  watchlater: 1 | 0;
  bookmark: 1 | 0;
  arg: TogglePlanToWatchArgs;
}) => {
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
              toggleBookmark({
                movie: arg.movie,
                setBookmarkTrigger: arg.setBookmarkTrigger,
                bookmarkTrigger: arg.bookmarkTrigger,
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
              toggleBookmark({
                movie: arg.movie,
                setBookmarkTrigger: arg.setBookmarkTrigger,
                bookmarkTrigger: arg.bookmarkTrigger,
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
              togglePlanToWatch({
                movie: arg.movie,
                setPlanToWatchTrigger: arg.setPlanToWatchTrigger,
                planToWatchTrigger: arg.planToWatchTrigger,
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
              togglePlanToWatch({
                movie: arg.movie,
                setPlanToWatchTrigger: arg.setPlanToWatchTrigger,
                planToWatchTrigger: arg.planToWatchTrigger,
              })
            }
          />
        )}
      </div>
    </>
  );
};

type SomeProps = {
  bookmark: 1 | 0;
  watchlater: 1 | 0;
  arg: TogglePlanToWatchArgs;
};

export const MovieCard = ({ arg, watchlater, bookmark }: SomeProps) => {
  return (
    <Card key={arg.movie.id} className={cn("w-[240px] max-h-[450px] p-2")}>
      <CardContent className={cn("flex items-center justify-center pt-6")}>
        <img
          loading="lazy"
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
            arg.movie.poster_path
              ? arg.movie.poster_path
              : arg.movie.backdrop_path
          }`}
          alt={`${arg.movie.title} image`}
        />
        <div className="flex-row mb-auto">
          <RenderActions
            watchlater={watchlater}
            bookmark={bookmark}
            arg={arg}
          />
        </div>
      </CardContent>
      <CardFooter className={cn("flex-initial items-center justify-center")}>
        <p>{arg.movie.title}</p>
      </CardFooter>
    </Card>
  );
};
