import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { ThemeToggle } from "./components/theme-provider/theme-toggle";
import { getMovieList } from "./api/getMovieList";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { MovieList } from "./types/movieList";
import { getMovie } from "./api/getMovie";
import { getMovieImages } from "./api/getMovieImages";
import { cn } from "./lib/utils";

const Some = () => {
  const [movies, setMovies] = useState<MovieList>();
  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList());
      if (movies) {
        await getMovieImages(movies.results[0].id);
      }
    };
    tmp();
  }, []);
  return (
    <div className={cn("grid-cols-2 grid gap-0 ")}>
      {movies?.results.map((x, ind) => (
        <Card className={cn("w-[380px]")}>
          {/* <CardHeader>placeholder</CardHeader> */}
          <CardContent key={ind}>
            <img
              src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${x.backdrop_path}`}
              alt=""
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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThemeToggle />
      <Some></Some>
    </ThemeProvider>
  );
}

export default App;
