import { cn } from "../../lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { Movie } from "@/types/movie";
import { MovieList } from "@/types/movieList";
import { PlanToWatch } from "@/types/planToWtach";

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
  movie,
  togglePlanToWatch,
}: {
  exists: boolean;
  movie: Movie;
  togglePlanToWatch: (x: Movie) => void;
}) => {
  if (exists) {
    return (
      <MdWatchLater
        className={cn(
          "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
        )}
        size={35}
        onClick={() => togglePlanToWatch(movie)}
      />
    );
  }
  return (
    <MdOutlineWatchLater
      className={cn(
        "rounded-md hover:cursor-pointer transition-all dark:scale-100 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent m-1"
      )}
      size={35}
      onClick={() => togglePlanToWatch(movie)}
    />
  );
};

type MovieListingProps = {
  movies: MovieList | undefined;
  planToWatches: PTW | undefined;
  togglePlanToWatch: (x: Movie) => void;
};

export const MovieListing = ({
  movies,
  planToWatches,
  togglePlanToWatch,
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
                movie={x}
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
