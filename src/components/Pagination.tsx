import { MdDoubleArrow } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  maxPage: number;
  next: () => void;
  prev: () => void;
  jump: (arg01: number) => void;
}

function Pagination({
  currentPage,
  next,
  jump,
  prev,
  maxPage,
}: PaginationProps) {
  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          prev();
        }}
      >
        <MdDoubleArrow style={{ transform: "rotate(180deg)" }} />
      </button>
      {Array(maxPage)
        .fill(0)
        .map((_, index) => {
          return (
            <button
              key={index}
              disabled={currentPage === index + 1}
              className={`${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => {
                jump(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      <button
        disabled={currentPage === maxPage}
        onClick={() => {
          next();
        }}
      >
        <MdDoubleArrow />
      </button>
    </div>
  );
}

export default Pagination;
