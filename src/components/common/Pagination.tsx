import { useState } from "react";
import styles from "./Pagination.module.css";
import cn from "classnames";

type PropsType = {
  totalItemsCount: number;
  currentPage: number;
  onChangePageNumber: (pageNumber: number) => void;
  pageSize?: number;
  portionSize?: number;
};

const Pagination: React.FC<PropsType> = ({
  totalItemsCount,
  currentPage,
  onChangePageNumber,
  pageSize = 5,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const currentPortionNumber = Math.ceil(currentPage / portionSize) || 1;

  const portionsCount = totalItemsCount / portionSize;
  const [portionNumber, setPortionNumber] =
    useState<number>(currentPortionNumber);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={cn(styles.pageNumbers)}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          Prev
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber,
        )
        .map((p) => {
          return (
            <span
              key={p}
              className={cn({ [styles.selectedPage]: currentPage === p })}
              onClick={() => {
                onChangePageNumber(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionNumber < portionsCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
