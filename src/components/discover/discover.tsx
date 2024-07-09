import { useState, useEffect } from "react";
import { getMovieList } from "../../api/getMovieList";
import { cn } from "../../lib/utils";
import { MovieList } from "../../types/movieList";
import { Card, CardContent, CardFooter } from "../ui/card";

export const Discover = () => {
  const [movies, setMovies] = useState<MovieList>();
  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList());
    };
    tmp();
  }, []);
  return (
    <div className={cn("grid-cols-2 grid gap-10 pl-52 pr-52")}>
      {movies?.results.map((x, ind) => (
        <Card key={ind} className={cn("w-[380px]")}>
          <CardContent>
            <img
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${x.backdrop_path}`}
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
