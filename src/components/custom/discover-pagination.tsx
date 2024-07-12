import { cn } from "../../lib/utils";
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
  totalPages: number;
};

export const DiscoverPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  ...props
}: DiscoverPaginationProps) => {
  const setNextPageHandler = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };
  const setPreviousPageHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const pagination = () => {
    if (!(totalPages > 5)) {
      const res = [];
      for (let i = 1; i <= totalPages; i++) {
        res.push(
          <PaginationLink
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
            size="default"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        );
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        res.push(
          <PaginationLink
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
    <Pagination {...props} className="m-4">
      <PaginationContent>
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationFirst
              className={cn("cursor-default hover:cursor-pointer")}
              size={"default"}
              onClick={() => setCurrentPage(1)}
            />
          </PaginationItem>
        )}
        {currentPage !== 1 && (
          <PaginationItem
            onClick={setPreviousPageHandler}
            className={cn("cursor-default hover:cursor-pointer")}
          >
            <PaginationPrevious size="default" />
          </PaginationItem>
        )}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagination()?.map((x, ind) => (
          <PaginationItem
            className={cn("cursor-default hover:cursor-pointer")}
            key={ind}
          >
            {x}
          </PaginationItem>
        ))}

        {currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <PaginationItem
            onClick={setNextPageHandler}
            className={cn("cursor-default hover:cursor-pointer")}
          >
            <PaginationNext size="default" />
          </PaginationItem>
        )}
        {currentPage !== totalPages && (
          <PaginationItem className={cn("cursor-default hover:cursor-pointer")}>
            <PaginationLast
              size={"default"}
              onClick={() => setCurrentPage(totalPages)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
