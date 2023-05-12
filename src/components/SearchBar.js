import React, { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import { DEBOUNCE_TIME_DELAY_IN_MS } from "../utils/constants";
import useDebounceSearch from "../hooks/useDebounceSearch";


// Search Bar component
/**
 *
 * @param { Array.<object> } usersRecordDisplay
 *   state varaible containing usersRecord object for control the view on display of user records on search
 *
 * @param { Function } setUsersRecordDisplay
 *     sets the state of userRecordBase
 *
 * @param { boolean } isLoading
 *    to hide the no records found text when page initially loads
 *
 * @param {  Array.<object> } usersRecordBase
 *   user records base to maintain the update of records
 *
 * @returns { JSX.Element }
 *    JSX for search bar component
 *
 */

const SearchBar = ({
  usersRecordDisplay,
  setUsersRecordDisplay,
  isLoading,
  usersRecordBase,
}) => {
  //state varaible and setter for storing and setting the search term
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * custom hook to perform debouncing of search term when user types continuously 
   * and get the search term value after 500ms of pause on typing
   */
  
  const debouncedSearchValue = useDebounceSearch(
    searchTerm,
    DEBOUNCE_TIME_DELAY_IN_MS
  );

  // function to perform search either by name, email or role.
  /**
   *
   * @param {string} searchValue
   */

  const performSearch = (searchValue) => {

    /**
     * filtering  to get list of vlaues matched with typed search term.
     * Filter on usersRecordBase is performed as it contains all the records (after each performed action).
     */
    const filteredData = usersRecordBase.filter((user) => {
      return (
        user.name.toLowerCase().match(searchValue.toLowerCase()) ||
        user.email.toLowerCase().match(searchValue.toLowerCase()) ||
        user.role.toLowerCase().match(searchValue.toLowerCase())
      );
    });

    //sets the userRecordDispaly varaiable to show the filtered records value on screen
    setUsersRecordDisplay(filteredData);
  };

  //executing the perform search function after getting the debounced search term value
  useEffect(() => {
    performSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  //onChange event handler to set the search term
  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section aria-label="Seach Box">
      <input
        type="text"
        className="search-bar"
        onChange={handleSearchTerm}
        placeholder="Search by Name, Email or Role"
        aria-label="Search by Name, Email or Role"
      />
      <br />
      {!isLoading && usersRecordDisplay.length === 0 && (
        <h2 className="no-result">No Records Found</h2>
      )}
    </section>
  );
};

export default SearchBar;
