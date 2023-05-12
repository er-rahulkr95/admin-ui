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

/** GET - usersRecorde from the api endPoint */
mock.onGet(`${config.apiEndpoint}`).reply(200, usersRecord);

jest.useFakeTimers();

describe("Admin-UI - Pagination Section and Delete Selected Test", () => {

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


    it("1. Should have a pagination", async () => {

        const pagination = screen.getByRole('navigation', {name:"pagination navigation"});
        expect(pagination).toBeInTheDocument();

    })

    
    it("2. Should have a go to first page pagination button", async () => {

        const goToFirstPage = screen.getByRole('button', {name:"Go to first page"});
        expect(goToFirstPage).toBeInTheDocument();

    })

    it("3. Should have a go to previous page pagination button", async () => {

        const goToPreviousPage = screen.getByRole('button', {name:"Go to previous page"});
        expect(goToPreviousPage).toBeInTheDocument();

    })

    it("4. Should have a go to next page pagination button", async () => {

   
        const goToNextPage = screen.getByRole('button', {name:"Go to next page"});
        expect(goToNextPage).toBeInTheDocument();

    })

    it("5. Should have a go to last page pagination button", async () => {

        const goToLastPage = screen.getByRole('button', {name:"Go to last page"});
        expect(goToLastPage).toBeInTheDocument();

    })

    it("6. Should have a go to last page pagination button", async () => {

        const goToLastPage = screen.getByRole('button', {name:"Go to last page"});
        expect(goToLastPage).toBeInTheDocument();

    })

    it("7. Should have a 'Delete Select' button", async () => {

        const deleteSelecedButton = screen.getByRole('button', {name:"Delete Selected"});
        expect(deleteSelecedButton).toBeInTheDocument();

    })

    it("8. 'Delete Select' should remove selected records and show notification", async () => {

        const deleteSelecedButton = screen.getByRole('button', {name:"Delete Selected"});
        expect(deleteSelecedButton).toBeInTheDocument();


        const checkBoxes = screen.getAllByRole('checkbox')
        checkBoxes.forEach(checkbox=>  expect(checkbox).not.toBeChecked())
        
       await act(async () => {
            for(let i=2; i<=6; i++){
                userEvent.click(checkBoxes[i]);
            }
        
        });
       
        //Name of users selected for removal 
        const nameOfUsers = ["Aishwarya Naik", "Arvind Kumar", "Caterina Binotto","Chetan Kumar","Jim McClain" ]
        const userRecordsInDocument =    nameOfUsers.map(users=>screen.getByText(users))

        // checking whether these users are present 
        userRecordsInDocument.forEach(users=>{
            expect(users).toBeInTheDocument();
        })

        await act(async () => {
            userEvent.click(deleteSelecedButton);
        });
       

        const alert = await screen.findByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent(`${nameOfUsers.length} Users Record Removed Successfully`);

          // checking whether these users are not present i.e. removed
          userRecordsInDocument.forEach(users=>{
            expect(users).not.toBeInTheDocument();
        })


    })



});