<h1 align="center" id="title">Admin UI</h1>

![admin-ui](https://socialify.git.ci/er-rahulkr95/admin-ui/image?forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Auto)

# Admin UI

An interface for admins to see, search, modify and delete users.

## <h2>🚀 Demo</h2>

[https://rahulkr95-admin-ui.netlify.app](https://rahulkr95-admin-ui.netlify.app)

## Tech Stack

### Built With
Technologies used in building the project:
- React
- Javascript
- HTML
- CSS
- Notistack
- Axios

### Tested With 
Technologies used for creating test cases for the project:
- @testing-library/jest-dom
- @testing-library/react"
- @testing-library/user-event
- axios-mock-adapter

**Note: Tested with different scenario and all the test cases are passing. 
        Test report is added in the repository**

## Requirements

The requirements and feature that needs to be implemented in the project are available here at [Geektrust](https://www.geektrust.com/challenge/admin-uihttps://www.geektrust.com/challenge/admin-ui).


## Features

- An interface for admins to see, modify, save and delete users.
- Custom validation to verify field should not be empty or should not contain only white spaces with no character whenever a record/row is saved after editing.
- A success message will slide through from top center of display whenever a row is updated or deleted.
- A warning message will appear whenever try to save an empty field after editing.
- Search bar that can filter on any property.

- Implemented debouncing for search operation for better user experience, which can be also used in future to avoid expensive api calls made due to each key strokes.

- Able to edit and delete rows in search result also.

- Show a message when no result is found for searched term.

- Created a custom Pagination hook for Pagination. Each page contains 10 rows. Buttons at the bottom allow to jump to any page including special buttons for first page, previous page, next page and last page.

- Pagination update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.

- Able to select one or more rows. A selected row is highlighted with a grayish background color.


## Responsiveness

The Table view area and pagination section will adapt to responsiveness to different viewport width.

The Table header and body is made horizontally scrollable , whereas for vertical scrolling header is fixed and table body scrolls for mobile view.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Run Locally

Clone the project

```bash
  git clone https://github.com/er-rahulkr95/admin-ui.git
```

Go to the project directory

```bash
  cd admin-ui
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
It will runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
It will run the test cases from available test suites ( 3 inside src/_test_/* directory and 1 is App.test.js)

Test suites are stored in /admin-ui/src/_test_/*


# Other available scripts

Builds the app for production to the `build` folder.

```bash
  npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Eject

```bash
  npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# API

Users Record API to list all the users and their properties is provided.

## Request Type

GET


## API Endpoint

[https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json)

**Note : The users are sorted by `id` field. There is no alphabetical sorting.**


# Feedback

If you have any feedback, please reach out to  er.rahulkr95@gmail.com

# License

MIT
