import React from "react";
import updateUsersRecord from "../utils/updateUsersRecord";
import { useSnackbar } from "notistack";


// Delete Selected Component
/**
 *
 * @param { Array.<object> } usersRecordDisplay
 *   state varaible containing usersRecord object for control the view on display of user records
 *
 * @param { Function } setUsersRecordDisplay
 *     sets the state of userRecordBase
 *
 * @param { Function } setUsersRecordBase
 *   sets the state of userRecordBase
 *
 * @param {  Array.<object> } usersRecordBase
 *   user records base to maintain the update of records
 *
 * @returns { JSX.Element }
 *    JSX for the Selected Delete button
 *
 */

const DeleteSelected = ({
  usersRecordBase,
  usersRecordDisplay,
  setUsersRecordDisplay,
  setUsersRecordBase,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  //onClick event handler to delete multiselected user record
  const handleMultiDelete = () => {
    //stores the new userRecords after adding new isChecked property marked to true to user object
    let tempUsersAfterSelection = updateUsersRecord(
      usersRecordBase,
      usersRecordDisplay
    );

    /**
     * stores the filtered userRecords whose isChecked property is not true so that only
     * those records should get displayed and other reocrd whose isChecked property is true is get removed.
     */
    const usersDataAfterMultiDelete = tempUsersAfterSelection.filter(
      (user) => user.isChecked !== true
    );

    //calculates number of records deleted
    const totalRecordsToRemove =
      tempUsersAfterSelection.length - usersDataAfterMultiDelete.length;

    /**
     * setting usersRecordDisplay and userRecordBase to whole new list of records excluding removed elements.
     * When re-render happen new full set of records is passed to get perpage data and display it
     *  */
    setUsersRecordDisplay(usersDataAfterMultiDelete);
    setUsersRecordBase(usersDataAfterMultiDelete);
    enqueueSnackbar(
      `${totalRecordsToRemove} Users Record Removed Successfully`,
      { variant: "success" }
    );
  };

  return (
    <>
      <button
        className="delete-selected"
        onClick={() => handleMultiDelete()}
        aria-label="Delete Selected"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </span>
        Delete Selected
      </button>
    </>
  );
};

export default DeleteSelected;
