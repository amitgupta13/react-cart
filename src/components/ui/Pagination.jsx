import React from "react";
import { usePagination } from "../../hooks/usePagination";
import classes from "./Pagination.module.css";
import Card from "./Card";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className={classes.pagination}>
      {paginationRange.map((item, i) => {
        if (item === "...") return <div key={i}>{item}</div>;
        return (
          <div onClick={() => onPageChange(item)} key={i}>
            <Card className={classes["pagination-element"]}>
              <p className={classes.center}>{item}</p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
