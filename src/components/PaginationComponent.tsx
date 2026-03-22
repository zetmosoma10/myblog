import type { Response } from "#/types/response.type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "@tanstack/react-router";

const PaginationComponent = ({
  results,
  page,
  numberOfPages,
}: {
  results?: Response;
  page?: number;
  numberOfPages: number[];
}) => {
  const navigate = useNavigate();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page === 1) return;

              navigate({
                to: "/posts",
                search: (prev) => ({
                  ...prev,
                  page: (page ?? 1) - 1,
                }),
              });
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {numberOfPages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              isActive={item === results?.currentPage}
              onClick={() =>
                navigate({
                  to: "/posts",
                  search: (prev) => ({ ...prev, page: item }),
                })
              }
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (!results?.hasNextPage) return;

              navigate({
                to: "/posts",
                search: (prev) => ({
                  ...prev,
                  page: (page ?? 1) + 1,
                }),
              });
            }}
            className={
              !results?.hasNextPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
