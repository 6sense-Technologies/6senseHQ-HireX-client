import React, { FC } from "react";
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  searchText?: string;
  setItems?: (items: number) => void;
  totalPage?: number;
  totalItems?: number;
  items?: number;
  status?: string | null | undefined;
};

const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  searchText,
  setItems,
  totalPage,
  totalItems,
  items,
  status,
}) => {
  const router = useRouter();

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);

      const items = newPage * 10;
      // console.log(items);
      setItems(items);
      router.push(
        `/products?search=${searchText}&status=${status || ""}&page=${newPage}`
      );
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      const newPage = page + 1;
      setPage(newPage);

      let items;
      if (newPage * 10 > totalItems) {
        items = totalItems;
      } else {
        items = newPage * 10;
      }
      setItems(items);

      router.push(
        `/products?search=${searchText}&status=${status || ""}&page=${newPage}`
      );
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    router.push(
      `/products?search=${searchText}&status=${status || ""}&page=${pageNumber}`
    );
  };

  const renderPagination = () => {
    const pages = [];

    // Always include the first page
    pages.push(
      <button
        key={`page-1`}
        onClick={() => handlePageClick(1)}
        className={`mx-4 text-sm ${
          page === 1 ? "text-blue-500" : "text-subheading"
        }`}
      >
        1
      </button>
    );

    // Show pages 2 to 5 when the current page is 1, 2, 3, or 4
    if (page <= 4) {
      for (let i = 2; i <= Math.min(5, totalPage); i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageClick(i)}
            className={`mx-4 text-sm ${
              page === i ? "text-blue-500" : "text-subheading"
            }`}
          >
            {i}
          </button>
        );
      }

      // Show "DotsThree" if there are pages between the visible range and the last page
      if (totalPage > 5) {
        pages.push(
          <DotsThree
            key="dots-end"
            size={16}
            className="mx-1 mt-1 text-subheading"
          />
        );
      }
    } else {
      // Show "DotsThree" if there are pages between the first page and the visible range
      if (page > 4) {
        pages.push(
          <DotsThree
            key="dots-start"
            size={16}
            className="mx-1 mt-1 text-subheading"
          />
        );
      }

      // Add the pages before the current page, but avoid adding the first page again
      for (let i = Math.max(2, page - 1); i < page; i++) {
        pages.push(
          <button
            key={`page-before-${i}`} // Ensure unique keys for "before" pages
            onClick={() => handlePageClick(i)}
            className={`mx-4 text-sm ${
              page === i ? "text-blue-500" : "text-subheading"
            }`}
          >
            {i}
          </button>
        );
      }

      // Add the current page
      pages.push(
        <button
          key={`page-current-${page}`} // Ensure unique key for the current page
          onClick={() => handlePageClick(page)}
          className={`mx-4 text-sm font-bold text-blue-500`}
        >
          {page}
        </button>
      );

      // Add the pages after the current page, but only if it's not the last page
      for (let i = page + 1; i <= Math.min(page + 1, totalPage - 1); i++) {
        pages.push(
          <button
            key={`page-after-${i}`} // Ensure unique keys for "after" pages
            onClick={() => handlePageClick(i)}
            className={`mx-4 text-sm ${
              page === i ? "text-blue-500" : "text-subheading"
            }`}
          >
            {i}
          </button>
        );
      }

      // Show "DotsThree" if there are pages between the visible range and the last page
      if (page < totalPage - 2) {
        pages.push(
          <DotsThree
            key="dots-end"
            size={16}
            className="mx-1 mt-1 text-subheading"
          />
        );
      }
    }

    // Always include the last page, but only if it's not already part of the visible range
    if (totalPage > 4 && page !== totalPage) {
      pages.push(
        <button
          key={`page-last-${totalPage}`} // Ensure unique key for the last page
          onClick={() => handlePageClick(totalPage)}
          className={`mx-4 text-sm ${
            page === totalPage ? "text-blue-500" : "text-subheading"
          }`}
        >
          {totalPage}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="mt-4 mb-4 flex justify-between lg:max-w-[1000px]">
      <p className="text-subheading text-sm">
        {`Showing ${Math.min(items, totalItems)} out of ${totalItems}`}{" "}
      </p>
      <div className="flex justify-end items-center">
        {page > 1 && (
          <CaretLeft
            size={16}
            className="mr-4 cursor-pointer text-subheading hover:text-blue-700"
            onClick={handlePreviousPage}
          />
        )}
        {renderPagination()}
        {page < totalPage && (
          <CaretRight
            size={16}
            className="ml-4 cursor-pointer text-subheading hover:text-blue-700"
            onClick={handleNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
