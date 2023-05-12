//Function to update the user records to put new property to user object "isChecked" upon whether selected or not 
/**
 * 
 * @param {Array.<userRecord>} baseRecordsArray  - contain array of objects of user records
 * @param {Array.<comparingRecordsArray>} comparingRecordsArray   contain array of checked or selected user records
 * @returns {Array.<updatedRecords>}  - returns the new array of objects after adding new property "isChecked"
 * 
 * Note: baseRecordArray can be any array(e.g. either userRecordDisplay or userRecordBase) in which new property is to be added.
 */

const updateUsersRecord =(baseRecordsArray, comparingRecordsArray) =>{
    const updatedRecords =  baseRecordsArray.map((record) => {
        return {...record, ...(comparingRecordsArray.find(
          (newRecord) => newRecord.id === record.id
        ) )}})

        return updatedRecords;
}


export default updateUsersRecord ;