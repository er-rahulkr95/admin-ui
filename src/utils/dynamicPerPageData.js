// function to retrun array of user object to display on each page.
/**
 * 
 * @param {Array.<userRecords>} totalUserData  toal User Records - array of object containing data of users
 * @param {number} currentPageNumber  current page number selected by user (e.g. 1, 2...)
 * @param {number} dataPerPage        number of data or list to be displayed on each page change (e.g. 5, 10, 20)
 * @returns {Array.<userRecords>}   return sliced array of object from total user records depending on page number and perPage Data
 * 
 * Example: if total user data contain 46 records in total and data per page is set to be 10 (constant) , then the return records will be 
 * array of 10 different user objects depending on page number selected and last page contain only 6 records
 *
 */


const dynamicPerPageData = (totalUserData, currentPageNumber, dataPerPage) => {

  const indexOfLastData = currentPageNumber * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const slicedUserRecord = totalUserData.slice(indexOfFirstData, indexOfLastData);
  return slicedUserRecord;
};

export default dynamicPerPageData;
