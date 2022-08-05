import { useCallback, useState } from "react";

export function usePagination(
  data: {
    lastName: string;
    firstName: string;
    email: string;
    registrationDate: string;
    UserName: string;
    gender: string;
    imageUrl: string;
  }[],
  itemsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const getCurrentData = useCallback(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }, [currentPage, data, itemsPerPage]);

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: any) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return {
    next,
    prev,
    jump,
    currentPage,
    maxPage,
    getCurrentData,
  };
}
