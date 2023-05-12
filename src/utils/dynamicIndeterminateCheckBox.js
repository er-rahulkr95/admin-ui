// set the selectAll checkbox to either checked , unchecked or indeterminate states upon selection of some user records on any page.
// Indeterminate state helps user to identify if on any data is selected or not on any page. Improve the user experience.
/**
 * 
 * @param {Array.<Users>} usersRecordDisplay       users record to diaplay
 * @param {Array.<perPageUserData>} perPageData       list of 10 user record per page
 * @param {reference} indeterminateCheckBoxReference  selectAll Checkbox reference
 * 
 * Different state of checkbox
 * When clicked on seleAll checkbox => all user records get selected or unselected for the current display page only.
 * When a one or more checkboxes are selected on current page or on different pages => selectAll checkbox state will be indeterminate.
 * When all checkbox will be checked on current page =  selectAll checkbox state will be checked.
 * When none of user record checkbox is selected on any page => selectAll checkBox state will be unchecked.
 *
 */

const dynamicIndeterminateCheckBox = (usersRecordDisplay, perPageData, indeterminateCheckBoxReference) => {
    let tempUserSelectedData = usersRecordDisplay.filter(user => user.isChecked === true);
    let tempPerPageSelectedData = perPageData.filter(user => user.isChecked === true);

    if (tempPerPageSelectedData.length === perPageData.length && perPageData.length > 0) {
        indeterminateCheckBoxReference.current.checked = true;
        indeterminateCheckBoxReference.current.indeterminate = false;
    } else if ((tempUserSelectedData.length < usersRecordDisplay.length && tempUserSelectedData.length > 0) && (tempPerPageSelectedData.length < perPageData.length && tempPerPageSelectedData.length > 0)) {
        indeterminateCheckBoxReference.current.checked = false;
        indeterminateCheckBoxReference.current.indeterminate = true;
    } else if (tempPerPageSelectedData.length === 0 && tempUserSelectedData.length !== 0) {
        indeterminateCheckBoxReference.current.checked = false;
        indeterminateCheckBoxReference.current.indeterminate = true;
    } else if (tempUserSelectedData.length === 0 && tempPerPageSelectedData.length === 0) {
        indeterminateCheckBoxReference.current.checked = false;
        indeterminateCheckBoxReference.current.indeterminate = false;
    }

}

export default dynamicIndeterminateCheckBox