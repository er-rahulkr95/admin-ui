import React, { useState } from "react";
import "../styles/EditUserDetails.css";
import updateUsersRecord from "../utils/updateUsersRecord";
import { useSnackbar } from "notistack";

// Edit user details view component 
/**
 *@param { object } users
 *   object containing single user all details - {id, name, email, role}
 * 
 * @param { Array.<object> } usersRecordDisplay
 *   state varaible containing usersRecord object for control the view on display of user records.
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
 * @param {  Function } setEditUserRecord
 *   sets the state of ediUserRecord state variable to toggle the edit view
 *
 * @returns { JSX.Element }
 *    JSX for the Edit view of user records
 *
 */

const EditUserDetails = ({
  user,
  usersRecordDisplay,
  setUsersRecordDisplay,
  setEditUserRecord,
  setUsersRecordBase,
  usersRecordBase
}) => {

  // state variable and setter to update the user record after editiing
  const [updateUserData, setUpdateUserData] = useState(user);

  const { enqueueSnackbar } = useSnackbar();

  // onChange event handler for input text box, to edit and replace the currently selected user data with new data
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUpdateUserData((prevData) => ({ ...prevData, [name]: value }))
  };

 //Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not saved.
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages are shown as per below)
   * -    Check that name field is not an empty value - "name is a required field"
   * -    Check that email field is not an empty value - "email is a required field"
   * -    Check that role field is not an empty value - "role is a required field"
   * 
   */

  const validateInput = () => {
    if(updateUserData.name === "" ){
      enqueueSnackbar("Name is a required field",{variant:"warning"})
      return false;
    }else if(updateUserData.name.trim() === ""){
      enqueueSnackbar("Empty spaces is not valid name, Please enter a valid name",{variant:"warning"})
      return false;
    }
    if(updateUserData.email ===""){
      enqueueSnackbar("Email is a required field",{variant:"warning"})
      return false;
    }else if(updateUserData.email.trim() === ""){
      enqueueSnackbar("Empty spaces is not valid email, Please enter a valid email",{variant:"warning"})
      return false;
    }
    if(updateUserData.role === ""){
      enqueueSnackbar("Role is a required field",{variant:"warning"})
      return false;
    }else if(updateUserData.role.trim() === ""){
      enqueueSnackbar("Empty spaces is not valid role, Please enter a valid role",{variant:"warning"})
      return false;
    }
    return true;
  };



  // onClick event handler to save the record for display and record base
  const handleUpdateRecord = (event, userId) => {
    event.preventDefault();

    if(validateInput()){

    //stores the new list of data with edited record for display i.e. to update the UsersRecordDisplay
    const updatedUsersRecord = usersRecordDisplay.map((user) => {
      if (user.id === userId) {
        return { ...user, ...updateUserData };
      } else {
        return user;
      }
    });

    //stores the new list with updated data to update the userRecordBase
    const updatedRecords = updateUsersRecord(usersRecordBase, updatedUsersRecord)

    setUsersRecordDisplay(updatedUsersRecord);

    setUsersRecordBase(updatedRecords);

    setEditUserRecord(null); // set to null so that edit view closes after saving records
    enqueueSnackbar(`User Record Updated Successfully`, { variant: "success" });
  }

  };

  //Onclick event handler for closing the edit view
  const handleCloseEditing = (event) => {
    event.preventDefault();
    setEditUserRecord(null);
  };

  return (
    <>
      <td></td>
      <td>
        <input
          type="text"
          className="user-detail-input"
          value={updateUserData.name}
          placeholder="Enter name"
          name="name"
          aria-label="Enter Name"
          onChange={handleOnChange}
        
        />
      </td>
      <td>
        <input
          type="email"
          className="user-detail-input"
          value={updateUserData.email}
          placeholder="Enter email"
          name="email"
          aria-label="Enter Email"
          onChange={handleOnChange}
  
        />
      </td>
      <td>
        <input
          type="text"
          className="user-detail-input"
          value={updateUserData.role}
          placeholder="Enter role"
          name="role"
          aria-label="Enter Role"
          onChange={handleOnChange}
        />
      </td>
      <td className="action user-detail-input" >
        <button onClick={(event) => {
          handleUpdateRecord(event, updateUserData.id);
        }} aria-label="save updated user detail">
          <span>
            <svg
              type="submit"

              className="success"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          </span>
        </button>
        <button onClick={(event) => {
          handleCloseEditing(event);
        }}  aria-label="close edit view">
          <span>
            <svg
              className="close"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </span>
        </button>
      </td>
    </>
  );
};

export default EditUserDetails;
