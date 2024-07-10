import { cn } from "../../lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { Movie } from "@/types/movie";
import { MovieList } from "@/types/movieList";
import { PlanToWatch } from "@/types/planToWtach";
import { TogglePlanToWatchArgs } from "@/routes/discover.nowplaying";

type PTW = {
  [id: number]: PlanToWatch | undefined;
};

export const ReduceToPTW = (
  plans: PlanToWatch[] | undefined
): PTW | undefined => {
  return plans?.reduce((acc, curr) => {
    acc[curr.movie.id] = curr;
    return acc;
  }, {} as PTW);
};

const RenderPlanToWatch = ({
  exists,
  arg,
  togglePlanToWatch,
}: {
  exists: boolean;
  arg: TogglePlanToWatchArgs;
  togglePlanToWatch: (arg: TogglePlanToWatchArgs) => void;
}) => {
  if (exists) {
    return (
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
    );
  }
  return (
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
  );
};

type MovieListingProps = {
  movies: MovieList | undefined;
  planToWatches: PTW | undefined;
  planToWatchTrigger: boolean;
  setPlanToWatchTrigger: (x: boolean) => void;
  togglePlanToWatch: (arg: TogglePlanToWatchArgs) => void;
};

export const MovieCard = ({
  x,
  exists,
  planToWatchTrigger,
  setPlanToWatchTrigger,
  togglePlanToWatch,
  ...props
}: {
  x: Movie;
  exists: boolean;
  planToWatchTrigger: boolean;
  setPlanToWatchTrigger: (x: boolean) => void;
  togglePlanToWatch: (x: TogglePlanToWatchArgs) => void;
}) => {
  <Card key={x.id} className={cn("w-[230px]")} {...props}>
    <div className="flex justify-between">
      <div>
        {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
      </div>
      <div>
        <RenderPlanToWatch
          exists={exists}
          arg={{ movie: x, planToWatchTrigger, setPlanToWatchTrigger }}
          togglePlanToWatch={togglePlanToWatch}
        />
      </div>
    </div>
    <CardContent className={cn("flex items-center justify-center pt-2")}>
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
          x.poster_path ? x.poster_path : x.backdrop_path
        }`}
        alt={`${x.title} image`}
      />
    </CardContent>
    <CardFooter className={cn("flex-initial items-center justify-center")}>
      <p>{x.title}</p>
    </CardFooter>
  </Card>;
};

export const MovieListingPrimitive = ({
  movies,
  planToWatches,
  togglePlanToWatch,
  planToWatchTrigger,
  setPlanToWatchTrigger,
  ...props
}: {
  movies: Movie[] | undefined;
  planToWatches: PTW | undefined;
  planToWatchTrigger: boolean;
  setPlanToWatchTrigger: (x: boolean) => void;
  togglePlanToWatch: (arg: TogglePlanToWatchArgs) => void;
}) => {
  return (
    <>
      {movies?.map((x, ind) => (
        <Card key={ind} className={cn("w-[230px]")} {...props}>
          <div className="flex justify-between">
            <div>
              {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
            </div>
            <div>
              <RenderPlanToWatch
                exists={planToWatches && planToWatches[x.id] ? true : false}
                arg={{ movie: x, planToWatchTrigger, setPlanToWatchTrigger }}
                togglePlanToWatch={togglePlanToWatch}
              />
            </div>
          </div>
          <CardContent className={cn("flex items-center justify-center pt-2")}>
            <img
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
                x.poster_path ? x.poster_path : x.backdrop_path
              }`}
              alt={`${x.title} image`}
            />
          </CardContent>
          <CardFooter
            className={cn("flex-initial items-center justify-center")}
          >
            <p>{x.title}</p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
export const MovieListing = ({
  movies,
  planToWatches,
  togglePlanToWatch,
  planToWatchTrigger,
  setPlanToWatchTrigger,
  ...props
}: MovieListingProps) => {
  return (
    <div className={cn("grid-cols-5 grid gap-2")} {...props}>
      {movies?.results.map((x, ind) => (
        <Card key={ind} className={cn("w-[230px]")}>
          <div className="flex justify-between">
            <div>
              {/* <CiBookmark size={35} />
              <IoBookmark size={35} /> */}
            </div>
            <div>
              <RenderPlanToWatch
                exists={planToWatches && planToWatches[x.id] ? true : false}
                arg={{ movie: x, setPlanToWatchTrigger, planToWatchTrigger }}
                togglePlanToWatch={togglePlanToWatch}
              />
            </div>
          </div>
          <CardContent className={cn("flex items-center justify-center pt-2")}>
            <img
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face${
                x.poster_path ? x.poster_path : x.backdrop_path
              }`}
              alt={`${x.title} image`}
            />
          </CardContent>
          <CardFooter
            className={cn("flex-initial items-center justify-center")}
          >
            <p>{x.title}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
