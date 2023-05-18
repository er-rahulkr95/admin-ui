import React, { useState, useRef, useEffect } from "react";
import "../styles/AdminTable.css";
import ReadOnlyUserDetails from "./ReadOnlyUserDetails.js.js";
import EditUserDetails from "./EditUserDetails";
import dynamicIndeterminateCheckBox from "../utils/dynamicIndeterminateCheckBox";
import updateUsersRecord from "../utils/updateUsersRecord";
import { useSnackbar } from "notistack";

// Definition of Data Structures used
/**
 * @typedef {Arrary.<object>} UserRecord - Data of users record to view, update and delete
 * @typedef {Arrary.<object>} perPageData - user records to show on each page
 * @typedef {Arrary.<object>} usersRecordBase -  user records base to maintain the updates in records
 *
 * Each object contains properties:
 * @property {string} id - Unique ID for the user record
 * @property {string} name - Name of the user
 * @property {string} email - Email-id of the user
 * @property {string} role - the role of user like either member or admin
 *
 * Note: New property gets added in each record when checkbox is checked.
 * @property {boolean} isChecked - boolean to controll checkbox state
 */

// Admin table component
/**
 *
 * @param { Array.<object> } usersRecordDisplay
 *   state varaible containing usersRecord object for control the view on display of user records
 *
 * @param { Function } setUsersRecordDisplay
 *     sets the state of userRecordBase
 *
 * @param { Array.<object> } perPageData
 *    user records to show on each page
 *
 * @param { Function } setUsersRecordBase
 *   sets the state of userRecordBase
 *
 * @param {  Array.<object> } usersRecordBase
 *   user records base to maintain the update of records
 *
 * @returns { JSX.Element }
 *    JSX for the Table view
 *
 */

const AdminTable = ({
  usersRecordDisplay,
  setUsersRecordDisplay,
  perPageData,
  setUsersRecordBase,
  usersRecordBase,
}) => {
  //state variable and setters for editing the user
  const [editUserRecord, setEditUserRecord] = useState(null);

  //setter to set and display the notificaion with message
  const { enqueueSnackbar } = useSnackbar();

  //state variable which holds the reference of DOM Element of selectAll checkbox for enabling intederminate state
  const indeterminateCheckbox = useRef();

  //setting the indeterminate state of selecAll checkbox
  useEffect(() => {
    dynamicIndeterminateCheckBox(
      usersRecordDisplay,
      perPageData,
      indeterminateCheckbox
    );
  }, [usersRecordDisplay, perPageData]);

  /** onCick event handler to delete a single record on clicking on delete icon
   *
   * @param {number or string} userId - user id whose record need to delete
   */

  const handleDeleteRecord = (userId) => {

    /**stores the records from the currently displaying records on the screen after deleting a user record. 
     * Here filtering is performed on usersRecordDisplay array for the case of perpage along with search
     * scenario in which user the search the record and remove it, so that after deleting, records which are not deleted
     *  are still present on screenfor the searched value, because in search scenario userRecordDisplay is getting set.
     * */
    const recordsAfterDeleteForDisplay = usersRecordDisplay.filter(
      (user) => user.id !== userId
    );

    /**  filter the users excluding the record to be deleted. Here filtering is done on usersRecordBase array
     *  so that userRecordBase also get updated.
     * */
    const updatedRecordsForRecordBase = usersRecordBase.filter(
      (user) => user.id !== userId
    );

    enqueueSnackbar(`1 User Record Removed Successfully`, {
      variant: "success",
    });
    setUsersRecordBase(updatedRecordsForRecordBase);

    setUsersRecordDisplay(recordsAfterDeleteForDisplay);
  };

  /** onClick event handler to edit the user
   *
   * @param {number or string} userId  //user id for whose records need to get edited
   */
  const handleEditRecord = (userId) => {
    setEditUserRecord(userId);
  };

  // onchange event handler for selecting the records using checkbox either selectAll or select single checkbox

  const handleMultiSelectRecord = (event) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      /**
       * adding isChecked property to all the user records of current page only.
       */
      let selectedAllRecordsPerPage = perPageData.map((user) => ({
        ...user,
        isChecked: checked,
      }));

      /**
       * update the record to display all checked or all selected or vicecersa for user of current page only
       */
      let addingIsCheckedToUsersRecord = updateUsersRecord(
        usersRecordDisplay,
        selectedAllRecordsPerPage
      );

      setUsersRecordDisplay(addingIsCheckedToUsersRecord);

    } else {
      /**
       * update and store the record with isChecked properpty when selecting records individually on any page
       */
      let selectedRecord = usersRecordDisplay.map((user) => {
        return user.id.toString() === name.toString()
          ? { ...user, isChecked: checked }
          : user;
      });

      setUsersRecordDisplay(selectedRecord);
    }
  };

  return (
    <>
      <section className="table-contianer table-contianer-border">
        <table className="admin-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="selectAll"
                  ref={indeterminateCheckbox}
                  id="selectAll"
                  name="selectAll"
                  onChange={(event) => handleMultiSelectRecord(event)}
                  value="selectAll"
                  aria-label="select-deselect all records of current page"
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {perPageData.length > 0 && (
            <>
              <tbody className="admin-table-body">
                {perPageData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={
                      user.isChecked === true || editUserRecord === user.id
                        ? "selected-user"
                        : ""
                    }
                  >
                    {editUserRecord === user.id ? (
                      <EditUserDetails
                        user={user}
                        setUsersRecordDisplay={setUsersRecordDisplay}
                        setEditUserRecord={setEditUserRecord}
                        usersRecordDisplay={usersRecordDisplay}
                        setUsersRecordBase={setUsersRecordBase}
                        usersRecordBase={usersRecordBase}
                      />
                    ) : (
                      <ReadOnlyUserDetails
                        user={user}
                        handleDeleteRecord={handleDeleteRecord}
                        handleEditRecord={handleEditRecord}
                        handleMultiSelectRecord={handleMultiSelectRecord}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </section>
    </>
  );
};

export default AdminTable;
