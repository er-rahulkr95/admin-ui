import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import config from "../config.js/config";
import axios from "axios";
import AdminTable from "../components/AdminTable";
import usePagination from "../hooks/usePagination";
import { DATA_PER_PAGE } from "../utils/constants";
import Pagination from "../components/Pagination";
import "../styles/AdminUI.css";
import DeleteSelected from "../components/DeleteSelected";
import errorHandler from "../utils/errorHandler";
import { useSnackbar } from "notistack";

// Definition of Data Structures used
/**
 * @typedef {Arrary.<object>} UserRecord - Data of users record to view, update and delete
 * Each object contains properties:
 * @property {string} id - Unique ID for the user record
 * @property {string} name - Name of the user
 * @property {string} email - Email-id of the user
 * @property {string} role - the role of user like either member or admin
 * 
 */

const AdminUI = () => {
  // state varaible and setter for displaying the user record. View of records in table is controlled by this State varaible.
  const [usersRecordDisplay, setUsersRecordDisplay] = useState([]);

  //state variable and  setter for updating user record after update or delete.
  const [usersRecordBase, setUsersRecordBase] = useState([]);

  // custom hook for pagination
  const {
    currentPageNumber,
    pageNumbersArray,
    perPageData,
    totalPages,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    goToPage,
  } = usePagination(usersRecordDisplay, DATA_PER_PAGE); 

  const [isLoading, setIsLoading] = useState(true);
  const [countSelectedUsers, setCountSelectedUsers] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch users record data and store it
  /**
   * Make API call to get the users record list and store it to display the list
   *
   * @returns { Array.<Users> }
   *      Array of objects with complete data on all users
   *
   * API endpoint - "GET https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "id": "1",
   *          "name": "Aaron Miles",
   *          "email": "aaron@mailinator.com",
   *          "role": "member"
   *      },
   *      {
   *          "id": "2",
   *          "name": "Aishwarya Naik",
   *          "email": "aishwarya@mailinator.com",
   *          "role": "member"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 403
   *  statusText: Forbidden
   */

  const fetchRecords = async () => {
    try {
      const response = await axios.get(config.apiEndpoint);
      return response.data;
    } catch (error) {
      const errorResponse = errorHandler(error);
      enqueueSnackbar(`Error : ${errorResponse}`, { variant: "error" });
      return [];
    }
  };


  //Setting the user record base and user record for display on first time the page loads

  useEffect(() => {
   
    const onPageLoad = async () => {

      try{

        const usersRecord = await fetchRecords();
        setUsersRecordDisplay(usersRecord);
        setUsersRecordBase(usersRecord);
        setIsLoading(false);

      }catch(error){

        enqueueSnackbar("Error: Something Went Wrong.", { variant: "error" });

      }
     
    };

    onPageLoad();
  }, []);


  // To show the total number of user record selected using checkboxes 

  useEffect(() => {
    setCountSelectedUsers(
      usersRecordDisplay.filter((user) => user.isChecked === true).length
    );
  }, [usersRecordDisplay]);


  return (
    <>
      <SearchBar
        usersRecordDisplay={usersRecordDisplay}
        setUsersRecordDisplay={setUsersRecordDisplay}
        isLoading={isLoading}
        usersRecordBase={usersRecordBase}
      />
      <br />
      <AdminTable
        usersRecordDisplay={usersRecordDisplay}
        setUsersRecordDisplay={setUsersRecordDisplay}
        perPageData={perPageData}
        setUsersRecordBase={setUsersRecordBase}
        usersRecordBase={usersRecordBase}
      />
      {isLoading && <h2 className="loading-data">Loading Data ...</h2>}
      <section className="pagination-section">
        <DeleteSelected
          usersRecordBase={usersRecordBase}
          usersRecordDisplay={usersRecordDisplay}
          setUsersRecordDisplay={setUsersRecordDisplay}
          setUsersRecordBase={setUsersRecordBase}
        />
        <h3
          className={`${
            countSelectedUsers > 0 ? "count-selected" : "zero-selected"
          }`}
        >
          <span>{countSelectedUsers}</span> records selected
        </h3>
        <Pagination
          pageNumbersArray={pageNumbersArray}
          totalPages={totalPages}
          currentPageNumber={currentPageNumber}
          goToFirstPage={goToFirstPage}
          goToPreviousPage={goToPreviousPage}
          goToPage={goToPage}
          goToNextPage={goToNextPage}
          goToLastPage={goToLastPage}
        />
      </section>
    </>
  );
};

export default AdminUI;
