"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { Icon } from "../Icon/Icon";

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className={css.paginationContainer}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<Icon id="arrow-Up" className={css.pageIconRight} />}
        previousLabel={<Icon id="arrow-Up" className={css.pageIconLeft} />}
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={forcePage}
        containerClassName={css.pagination}
        activeClassName={css.activePage}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.navItem}
        nextClassName={css.navItem}
        disabledClassName={css.disabled}
        breakClassName={css.breakItem}
      />
    </div>
  );
}
