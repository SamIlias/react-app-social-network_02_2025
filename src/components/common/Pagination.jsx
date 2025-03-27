import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  totalItemsCount,
  currentPage,
  onChangePageNumber,
  pageSize = 5,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  // const pagesCount = 10;
  const pages = [];

  for (let i = 1; i <= pagesCount; i += 1) {
    pages.push(i);
  }

  const portionsCount = totalItemsCount / portionSize;
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pageNumbers}>
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
              className={currentPage === p ? styles.selectedPage : ""}
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
