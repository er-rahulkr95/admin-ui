import React from "react";
import "../styles/Pagination.css";
import { ELLIPSIS } from "../utils/constants";

// Pagination component 
/**
 *@param { Array } pageNumbersArray
 *   page number arrays - Ex. [1,2,3,4,"...",10] for displaying pagination button
 * 
 * @param { number } currentPageNumber
 *   current page number selected
 *
 * @param { Function } totalPages
 *     total number of pages
 *
 * @param { Function } goToFirstPage
 *   function which set the page number to 1
 *
 * @param {  Function } goToPreviousPage
 *  function which set the page number to go to previous page 
 * 
 * @param {  Function } goToNextPage
 *   function which set the page number to go to next page
 * 
 * @param {  Function } goToLastPage
 *   function which set the page number to go to last page
 * 
 * @param {  Function(@param (pageNumber)) } goToPage
 *   function which set the page number to go to any specific page number
 *
 *
 * @returns { JSX.Element }
 *    JSX for the Pagination Component
 *
 */


const Pagination = ({
  pageNumbersArray,
  currentPageNumber,
  totalPages,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  goToPage
}) => {


  return (
    <>
      <section>
        <nav className="pagination" aria-label="pagination navigation">
          <ul>
            <li>
              <button
                className={`${
                  (totalPages === 0 || currentPageNumber === 1)
                    ? "pagination-button disabled"
                    : "pagination-button first"
                }`}
                aria-label="Go to first page"
                onClick={goToFirstPage}
                disabled={(totalPages === 0 || currentPageNumber === 1)?true:false}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                </svg>
              </button>
            </li>
            <li>
              <button
                className={`${
                  (totalPages === 0 || currentPageNumber === 1)
                    ? "pagination-button disabled"
                    : "pagination-button prev"
                }`}
                aria-label="Go to previous page"
                onClick={goToPreviousPage}
                disabled={(totalPages === 0 || currentPageNumber === 1)?true:false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </li>
            {pageNumbersArray.map((pageNumber, index) => (
              <li key={index}>
                <button
                  className={`${
                      currentPageNumber === pageNumber && currentPageNumber!==ELLIPSIS
                      ? "pagination-button active"
                      : (pageNumber===0 || pageNumber===ELLIPSIS)? "pagination-button disabled": "pagination-button jump"
                  }`}
                  aria-label={`Page Number ${pageNumber}`}
                  onClick={() => goToPage(pageNumber)}
                  disabled={(pageNumber===0 || pageNumber===ELLIPSIS)?true:false}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`${
                  (totalPages === 0 || currentPageNumber === totalPages)
                    ? "pagination-button disabled"
                    : "pagination-button next"
                }`}
                aria-label="Go to next page"
                onClick={goToNextPage}
                disabled={(totalPages === 0 || currentPageNumber === totalPages)?true:false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </button>
            </li>
            <li className="end">
              <button
                className={`${
                  (totalPages === 0 || currentPageNumber === totalPages)
                    ? "pagination-button disabled"
                    : "pagination-button last"
                }`}
                aria-label="Go to last page"
                onClick={goToLastPage}
                disabled={(totalPages === 0 || currentPageNumber === totalPages)?true:false}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Pagination;
