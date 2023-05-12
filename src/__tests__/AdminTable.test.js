import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import {
    act,
    render,
    screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import App from '../App';
import { SnackbarProvider } from "notistack";
import config from '../config.js/config';


/** 
 * Mocks the Axios http methods to give mock data as response
 */
const mock = new MockAdapter(axios);

const usersRecord = [
    {
        "id": "1",
        "name": "Aaron Miles",
        "email": "aaron@mailinator.com",
        "role": "member"
    },
    {
        "id": "2",
        "name": "Aishwarya Naik",
        "email": "aishwarya@mailinator.com",
        "role": "member"
    },
    {
        "id": "3",
        "name": "Arvind Kumar",
        "email": "arvind@mailinator.com",
        "role": "admin"
    },
    {
        "id": "4",
        "name": "Caterina Binotto",
        "email": "caterina@mailinator.com",
        "role": "member"
    },
    {
        "id": "5",
        "name": "Chetan Kumar",
        "email": "chetan@mailinator.com",
        "role": "member"
    },
    {
        "id": "6",
        "name": "Jim McClain",
        "email": "jim@mailinator.com",
        "role": "member"
    },
    {
        "id": "7",
        "name": "Mahaveer Singh",
        "email": "mahaveer@mailinator.com",
        "role": "member"
    },
    {
        "id": "8",
        "name": "Rahul Jain",
        "email": "rahul@mailinator.com",
        "role": "admin"
    },
    {
        "id": "9",
        "name": "Rizan Khan",
        "email": "rizan@mailinator.com",
        "role": "member"
    },
    {
        "id": "10",
        "name": "Sarah Potter",
        "email": "sarah@mailinator.com",
        "role": "admin"
    },
    {
        "id": "11",
        "name": "Keshav Muddaiah",
        "email": "keshav@mailinator.com",
        "role": "member"
    },
    {
        "id": "12",
        "name": "Nita Ramesh",
        "email": "nita@mailinator.com",
        "role": "member"
    },
    {
        "id": "13",
        "name": "Julia Hunstman",
        "email": "julia@mailinator.com",
        "role": "member"
    },
    {
        "id": "14",
        "name": "Juan Alonso",
        "email": "juan@mailinator.com",
        "role": "admin"
    },
    {
        "id": "15",
        "name": "Gabriel Montoya",
        "email": "gabriel@mailinator.com",
        "role": "admin"
    },
]

/** 
 * Mocks the Axios http methods to give mock data as response
 */
mock.onGet(`${config.apiEndpoint}`).reply(200, usersRecord);

jest.useFakeTimers();

describe("Admin-UI - Admin Table Test", () => {

    const AdminUIDOMTree = () => (
        <SnackbarProvider
            maxSnack={2}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <App />
        </SnackbarProvider>

    );


    beforeEach(async () => {

        // https://github.com/clarkbw/jest-localstorage-mock/issues/125
        jest.clearAllMocks();

        await act(async () => {
            render(AdminUIDOMTree());
        });

    });


    it("1. should have a table header", async () => {

        const tableHeaders = screen.getAllByRole("columnheader");

        expect(tableHeaders.length).toEqual(5);

    })

    it("2. should have a table body", async () => {

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });

        const tableBody = container.querySelector("tbody");
        expect(tableBody).toBeInTheDocument();

    })

    it("3. should have a table rows with data loaded", async () => {

        await act(async () => {
            jest.runAllTimers();
        });


        const tableRows = screen.getAllByText("member");

        expect(tableRows.length > 5).toBeTruthy();
    })

    it("4. should have an edit button for each user record", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' });

        expect(editButton.length).toEqual(10);
    })

    it("5. should have an delete button for each user record", async () => {

        const deleteButton = screen.getAllByRole('button', { name: 'delete user button' });

        expect(deleteButton.length).toEqual(10);
    })

    it("6. should delete a user when clicked on the delete button", async () => {

        const deleteButton = screen.getAllByRole('button', { name: 'delete user button' })[2];
        const text = screen.getByText(/Arvind Kumar/i);
        expect(text).toBeInTheDocument();
        await act(async () => {
            userEvent.click(deleteButton);
        });

        expect(text).not.toBeInTheDocument();
    })

    it("7. should show input box to edit a user record when clicked on the edit button", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' })[2];

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });

        const input = screen.queryAllByPlaceholderText(/enter name/i);
        expect(input).toEqual([]);

        await act(async () => {
            userEvent.click(editButton);
        });
        const name = screen.getByPlaceholderText(/enter name/i);
        expect(name).toBeInTheDocument();
        expect(name.getAttribute('value')).toEqual("Arvind Kumar");
        expect(name.getAttribute('value')).not.toEqual("Aishwarya Naik");
    });

    it("8. should have a save button and throw error if 'Name' field is empty when clicked on save button after editing", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' })[2];

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });


        await act(async () => {
            userEvent.click(editButton);
        });

        const name = screen.getByPlaceholderText(/enter name/i);

        await act(async () => {
            userEvent.clear(name);
        });

        const saveButton = screen.getByRole('button', { name: 'save updated user detail' })
        expect(saveButton).toBeInTheDocument();
        await act(async () => {
            userEvent.click(saveButton);
        });


        const alert = await screen.findByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/Name is a required field/i);
    });

    it("9. should have a save button and throw error if 'Email' field is empty when clicked on save button after editing", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' })[2];

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });


        await act(async () => {
            userEvent.click(editButton);
        });

        const email = screen.getByPlaceholderText(/enter email/i);

        await act(async () => {
            userEvent.clear(email);
        });

        const saveButton = screen.getByRole('button', { name: 'save updated user detail' })
        expect(saveButton).toBeInTheDocument();
        await act(async () => {
            userEvent.click(saveButton);
        });


        const alert = await screen.findByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/Email is a required field/i);
    });


    it("10. should have a save button and throw error if 'Role' field is empty when clicked on save button after editing", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' })[2];

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });


        await act(async () => {
            userEvent.click(editButton);
        });

        const role = screen.getByPlaceholderText(/enter role/i);

        await act(async () => {
            userEvent.clear(role);
        });

        const saveButton = screen.getByRole('button', { name: 'save updated user detail' })
        expect(saveButton).toBeInTheDocument();
        await act(async () => {
            userEvent.click(saveButton);
        });


        const alert = await screen.findByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/Role is a required field/i);
    });

    it("11. should save an updated detail successfully after editing", async () => {

        const editButton = screen.getAllByRole('button', { name: 'edit user button' })[2];

        let container;
        await act(async () => {
            ({ container } = render(<App />));
        });


        await act(async () => {
            userEvent.click(editButton);
        });

        const role = screen.getByPlaceholderText(/enter role/i);
        //changing the role to editor from admin
        await act(async () => {
            userEvent.clear(role);
            userEvent.type(role, "editor")
        });

        const saveButton = screen.getByRole('button', { name: 'save updated user detail' })
        expect(saveButton).toBeInTheDocument();
        await act(async () => {
            userEvent.click(saveButton);
        });


        const alert = await screen.findByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(/User Record Updated Successfully/i);

        const updatedRole = screen.getByText(/editor/);
        expect(updatedRole).toBeInTheDocument();
    });


    it("12. clicking on select All will select only 10 records per page or less than 10 if records shown is less then 10 per page", async () => {

        const selectAllCheckbox = screen.getByRole('checkbox', { name: 'select-deselect all records of current page' });

        const checkBoxes = screen.getAllByRole('checkbox')
        checkBoxes.forEach(checkbox=>  expect(checkbox).not.toBeChecked())
        
       await act(async () => {
            userEvent.click(selectAllCheckbox);
        });
       
        checkBoxes.forEach(checkbox=>  expect(checkbox).toBeChecked())

        /**
         * Here checking length to be less than or equal to 11 
         * because it includes selectAll checkbox also which makes total number of checboxes to be 11
         */
        expect(checkBoxes.length <= 11).toBeTruthy() 
    });


});
