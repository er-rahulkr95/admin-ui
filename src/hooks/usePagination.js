import { useEffect, useState } from "react";
import dynamicPerPageData from "../utils/dynamicPerPageData";
import dynamicPageNumbers from "../utils/dynamicPageNumbers";

/** Custom hook for  pagination
 * 
 * @param {Array.<usersRecordDisplay>} totalUserData - array of total object data, initially loaded will all the user ,
 *                                                      later it keeps changing based upon search and deletetion of records  
 * @param {number} dataPerPage - constant number - Maximum number of data to be displayed per page 
 * @returns {Object}
 * 
 * return Object contains =>  { currentPageNumber,pageNumbersArray, perPageData, totalPages, 
 *                              goToFirstPage, goToNextPage, goToPreviousPage , goToLastPage, 
 *                              goToPage }
 * @property {number} currentPageNumber - current page number selected
 * @property {Array.<number,string>} pageNumbersArray - list or array of page number
 * @property {Array.<usersRecord>} perPageData - sliced records to users to display on per page
 * @property {number} totalPages - total number pages
 * @property {function} goToFirstPage - Function to handle to go to first page
 * @property {function} goToNextPage - Function to handle to go to next page 
 * @property {function} goToPreviousPage - Function to handle to go to previous page
 * @property {function} goToLastPage - Function to handle to go the last page
 * @property {function} goToPage - Function to handle to go to clicked/selected page number
 * 
 * 
 * 
 */


const usePagination = (
  totalUserData,
  dataPerPage
) => {

    //state vaiable and setter for controlling the page number selected
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  // state variable and setter for displaying dynamic page number
  const [pageNumbersArray, setpageNumbersArray] = useState([]);

  //state variable and setter for storing and setting the state for records to display on each page dynamically
  const [perPageData, setPerPageData] = useState([]);

  //calculates the total number of pages
  let totalPages = Math.ceil(totalUserData.length / dataPerPage);

  //sets page numbers (array of page number) and perPageData (array to user records) for display on screen 
  useEffect(() => {

    const tempPageNumbers = dynamicPageNumbers(
      totalPages,
      currentPageNumber
    );
    const tempPerPageData = dynamicPerPageData(
      totalUserData,
      currentPageNumber,
      dataPerPage
    );
    setpageNumbersArray(tempPageNumbers);
    setPerPageData(tempPerPageData);

    if (currentPageNumber > totalPages) {
      setCurrentPageNumber(currentPage => Math.max(1, currentPage - 1));
    }

  }, [currentPageNumber, totalUserData]);

  //Function to handle to go to first page 
  function goToFirstPage() {
    setCurrentPageNumber(1);
  }

  //Function to handle to go to previous page 

  function goToPreviousPage() {
    setCurrentPageNumber(currentPage => Math.max(1, currentPage - 1));
  }

   //Function to handle to go to next page 
  function goToNextPage() {
    setCurrentPageNumber(currentPage => Math.min(currentPage + 1, totalPages));
  }

   //Function to handle to go to clicked/selected page number
  function goToPage(pageNumber) {
    setCurrentPageNumber(pageNumber);
  }

  //Function to handle to go to the last page
  function goToLastPage() {
    setCurrentPageNumber(currentPage => Math.max(currentPage, totalPages));
  }

  return { currentPageNumber, pageNumbersArray, perPageData, totalPages, goToFirstPage, goToNextPage, goToPreviousPage, goToLastPage, goToPage };
};

export default usePagination;
