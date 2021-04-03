import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
export const Pagination = ({handlePageClick, currentPage}) => {
    return (
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={30}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={styles.active}
            initialPage={+currentPage}
        />
    );
};
