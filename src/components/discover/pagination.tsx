import { MovieList } from "../../types/movieList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export type DiscoverPaginationProps = {
  currentPage: number;
  setCurrentPage: (num: number) => void;
  movies: MovieList;
};

export const DiscoverPagination = ({
  currentPage,
  movies,
  setCurrentPage,
  ...props
}: DiscoverPaginationProps) => {
  const setNextPageHandler = () => {
    if (currentPage === movies?.total_pages) return;
    setCurrentPage(currentPage + 1);
  };
  const setPreviousPageHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const pagination = () => {
    if (!movies) return;
    if (!(movies.total_pages > 5)) {
      const res = [];
      for (let i = 1; i <= movies.total_pages; i++) {
        res.push(
          <PaginationLink
            href="#"
            size="default"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        );
      }
      return res;
    }
    const res = [];
    if (currentPage < 3) {
      for (let i = 1; i <= 5; i++) {
        res.push(
          <PaginationLink
            href="#"
            size="default"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        );
      }
    } else if (currentPage >= movies.total_pages - 2) {
      for (let i = movies.total_pages - 4; i <= movies.total_pages; i++) {
        res.push(
          <PaginationLink
            href="#"
            size="default"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        );
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        res.push(
          <PaginationLink
            href="#"
            size="default"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        );
      }
    }
    return res;
  };

  return (
    <Pagination {...props}>
      <PaginationContent>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationFirst
              href="#"
              size={"default"}
              onClick={() => setCurrentPage(1)}
            />
          </PaginationItem>
        )}
        {currentPage !== 1 && (
          <PaginationItem onClick={setPreviousPageHandler}>
            <PaginationPrevious href="#" size="default" />
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagination()?.map((x, ind) => (
          <PaginationItem key={ind}>{x}</PaginationItem>
        ))}

        {currentPage < movies.total_pages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < movies.total_pages && (
          <PaginationItem onClick={setNextPageHandler}>
            <PaginationNext href="#" size="default" />
          </PaginationItem>
        )}
        {currentPage !== movies.total_pages && (
          <PaginationItem>
            <PaginationLast
              href="#"
              size={"default"}
              onClick={() => setCurrentPage(movies.total_pages)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
