import React, { FunctionComponent } from "react";
import { Pagination } from "react-bootstrap";

export interface IResultsPaginationProps {
  activePage: number;
  totalPages: number;
  onPageChange(page: number): void;
}

export const ResultsPagination: FunctionComponent<IResultsPaginationProps> = ({
  activePage = 1,
  totalPages,
  onPageChange = () => {},
}) => {
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const firstAndLast = [1, totalPages];
  const startPadding = activePage < 5 ? 5 - activePage : 2;
  const endPadding =
    activePage > totalPages - 4 ? activePage - (totalPages - 4) : 2;
  const prevAndNext = allPages.filter(
    (page) =>
      page <= activePage + startPadding && page >= activePage - endPadding
  );
  return (
    <Pagination>
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => onPageChange(activePage - 1)}
      />
      <Pagination.Item
        onClick={() => onPageChange(1)}
        active={activePage === 1}
      >
        {1}
      </Pagination.Item>
      {activePage >= 5 ? <Pagination.Ellipsis disabled /> : null}
      {allPages.map((page) => {
        if (prevAndNext.includes(page) && !firstAndLast.includes(page)) {
          return (
            <Pagination.Item
              key={page}
              active={page === activePage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          );
        } else {
          return null;
        }
      })}
      {activePage <= totalPages - 4 ? <Pagination.Ellipsis disabled /> : null}
      <Pagination.Item
        onClick={() => onPageChange(totalPages)}
        active={activePage === totalPages}
      >
        {totalPages}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};
