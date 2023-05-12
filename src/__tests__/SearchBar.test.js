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
    }
]

/** 
 * Mocks the Axios http methods to give mock data as response
 */
mock.onGet(`${config.apiEndpoint}`).reply(200, usersRecord);

jest.useFakeTimers();

describe("Admin-UI - Search Bar Test", () => {

    const AdminUIDOMTree = () => (
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <App/>
      </SnackbarProvider>
      
    );

    
  beforeEach(async () => {

    // https://github.com/clarkbw/jest-localstorage-mock/issues/125
    jest.clearAllMocks();

    await act(async () => {
      render(AdminUIDOMTree());
    });     
 
  });

 it("1. should have a search bar",  () => {
    const search = screen.getByPlaceholderText(/search/i);
    expect(search).toBeInTheDocument();
  });

  it("2. should perform search based on name", async()=>{
    const search = screen.getByPlaceholderText(/search/i);
   

    await act(async () => {
        userEvent.type(search, "jim");
        jest.runAllTimers();
      });
  
    const name =  screen.getByText(/Jim McClain/);
    expect(name).toBeInTheDocument();
  })

  it("3. should perform search based on email", async ()=>{

    const search = screen.getByPlaceholderText(/search/i);
  

    await act(async () => {
        userEvent.type(search, "arvind@mailinator.com");
        jest.runAllTimers();

      });
  
    const email = screen.getByText(/arvind@mailinator.com/);
    expect(email).toBeInTheDocument();
  })

  it("4. should perform search based on role", async ()=>{

    const search = screen.getByPlaceholderText(/search/i);
   

    await act(async () => {
        userEvent.type(search, "admin");
        jest.runAllTimers();
      

      });
  
    const role = screen.getAllByText(/admin/);
    expect(role.length>2).toBeTruthy();
  })

  it("5. should show 'no records found' if search string does not get user record", async ()=>{

    const search = screen.getByPlaceholderText(/search/i);
    

    await act(async () => {
        userEvent.type(search, "delhi");
        jest.runAllTimers();
      });

    
    const text = screen.getByText(/No Records Found/i);
    expect(text).toBeInTheDocument();
  
  })

});
