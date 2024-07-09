import { useState, useEffect } from "react";
import { getMovieList } from "../../api/getMovieList";
import { MovieList } from "../../types/movieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export const Discover = () => {
  const [movies, setMovies] = useState<MovieList>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setNextPageHandler = () => {
    if (currentPage === movies?.total_pages) return;
    setCurrentPage(currentPage + 1);
  };
  const setPreviousPageHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    const tmp = async () => {
      setMovies(await getMovieList());
    };
    tmp();
  }, []);
  return (
    <>
      {/* <MovieListing movies={movies}></MovieListing> */}
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem onClick={setPreviousPageHandler}>
              <PaginationPrevious href="#" size="default" />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage - 1 === 0}
              size="default"
              onClick={() =>
                setCurrentPage(
                  currentPage - 1 === 0 ? currentPage : currentPage - 1
                )
              }
            >
              {currentPage - 1 === 0 ? currentPage : currentPage - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={
                currentPage !== 1 && currentPage !== movies?.total_pages
              }
              size="default"
              onClick={() =>
                setCurrentPage(
                  currentPage !== 1 ? currentPage : currentPage + 1
                )
              }
            >
              {currentPage !== 1 ? currentPage : currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage === movies?.total_pages}
              size="default"
              onClick={() =>
                setCurrentPage(
                  currentPage === movies?.total_pages
                    ? currentPage
                    : currentPage + 1
                )
              }
            >
              {currentPage === 1
                ? currentPage + 2
                : currentPage + 1 === movies?.total_pages
                ? currentPage
                : currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          {currentPage !== movies?.total_pages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage !== movies?.total_pages && (
            <PaginationItem onClick={setNextPageHandler}>
              <PaginationNext href="#" size="default" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
