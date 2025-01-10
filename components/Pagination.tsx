import React, { FC } from 'react';
import { CaretLeft, CaretRight, DotsThree } from '@phosphor-icons/react';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPage: number | undefined;
  totalItems: number | undefined;
  items?: number;
};

const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  totalPage,
  totalItems,
  items,
}) => {
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < (totalPage ?? 0)) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];

    // Always include the first page
    pages.push(
      <button
        key={`page-1`}
        onClick={() => handlePageClick(1)}
        className={`mx-4 text-sm ${
          page === 1 ? 'text-blue-500' : 'text-subheading'
        }`}
      >
        1
      </button>
    );

    // Show pages 2 to 5 when the current page is 1, 2, 3, or 4
    if (page <= 4) {
      for (let i = 2; i <= Math.min(5, totalPage ?? 0); i++) {
        pages.push(
          <button
            key={`page-${i}`}
            onClick={() => handlePageClick(i)}
            className={`mx-4 text-sm ${
              page === i ? 'text-blue-500' : 'text-subheading'
            }`}
          >
            {i}
          </button>
        );
      }

      // Show "DotsThree" if there are pages between the visible range and the last page
      if ((totalPage ?? 0) > 5) {
        pages.push(
          <DotsThree
            key='dots-end'
            size={16}
            className='text-subheading mx-1 mt-1'
          />
        );
      }
    } else {
      // Show "DotsThree" if there are pages between the first page and the visible range
      if (page > 4) {
        pages.push(
          <DotsThree
            key='dots-start'
            size={16}
            className='text-subheading mx-1 mt-1'
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
              page === i ? 'text-blue-500' : 'text-subheading'
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
      for (
        let i = page + 1;
        i <= Math.min(page + 1, (totalPage ?? 0) - 1);
        i++
      ) {
        pages.push(
          <button
            key={`page-after-${i}`} // Ensure unique keys for "after" pages
            onClick={() => handlePageClick(i)}
            className={`mx-4 text-sm ${
              page === i ? 'text-blue-500' : 'text-subheading'
            }`}
          >
            {i}
          </button>
        );
      }

      // Show "DotsThree" if there are pages between the visible range and the last page
      if (page < (totalPage ?? 0) - 2) {
        pages.push(
          <DotsThree
            key='dots-end'
            size={16}
            className='text-subheading mx-1 mt-1'
          />
        );
      }
    }

    // Always include the last page, but only if it's not already part of the visible range
    if ((totalPage ?? 0) > 4 && page !== (totalPage ?? 0)) {
      pages.push(
        <button
          key={`page-last-${totalPage}`} // Ensure unique key for the last page
          onClick={() => totalPage !== undefined && handlePageClick(totalPage)}
          className={`mx-4 text-sm ${
            page === totalPage ? 'text-blue-500' : 'text-subheading'
          }`}
        >
          {totalPage}
        </button>
      );
    }

    return pages;
  };

  // Only show pagination controls if there is more than one page
  if ((totalPage ?? 0) <= 1) {
    return null;
  }

  return (
    <div className='mb-4 mt-4 flex justify-between lg:max-w-[1000px]'>
      <p className='text-subheading text-sm'>
        {`Showing ${Math.min(items ?? 0, totalItems ?? 0)} out of ${totalItems ?? 0}`}{' '}
      </p>
      <div className='flex items-center justify-end'>
        {page > 1 && (
          <CaretLeft
            size={16}
            className='text-subheading mr-4 cursor-pointer hover:text-blue-700'
            onClick={handlePreviousPage}
          />
        )}
        {renderPagination()}
        {page < (totalPage ?? 0) && (
          <CaretRight
            size={16}
            className='text-subheading ml-4 cursor-pointer hover:text-blue-700'
            onClick={handleNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
