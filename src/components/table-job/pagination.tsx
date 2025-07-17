import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';

interface PaginationTableJobProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}
export const PaginationTableJob: React.FC<PaginationTableJobProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, idx) => (
          <PaginationItem key={idx + 1}>
            <PaginationLink
              href="#"
              isActive={currentPage === idx + 1}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(idx + 1);
              }}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
