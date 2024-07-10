import { cn } from "../../lib/utils";
import { MovieList } from "../../types/movieList";
import { Card, CardContent, CardFooter } from "../ui/card";

export const MovieListing = ({
  movies,
  ...props
}: {
  movies: MovieList | undefined;
}) => {
  return (
    <div className={cn("grid-cols-5 grid gap-2")} {...props}>
      {movies?.results.map((x, ind) => (
        <Card key={ind} className={cn("w-[230px]")}>
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
