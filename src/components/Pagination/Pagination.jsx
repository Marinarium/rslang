import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss'

export const Pagination = ({handlePageClick, currentPage}) => {
    return (
        <ReactPaginate
            previousLabel={'<  '}
            nextLabel={'  >'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={30}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={+currentPage}
        />
    );
};
