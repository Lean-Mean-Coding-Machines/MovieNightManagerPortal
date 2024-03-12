# Prerequisites

Before running the application, ensure you have the following:

- **Node.js:** Ensure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
- **Java Development Kit (JDK):** Make sure you have JDK installed on your system for running the backend Java project. You can download it from [https://www.oracle.com/java/technologies/javase-jdk11-downloads.html](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or use OpenJDK.
- **IDE (Integrated Development Environment):** You will need an IDE to work with the Java backend. We recommend using IntelliJ IDEA, Eclipse, or Visual Studio Code.
- **npm Packages:** After cloning the repository, navigate to the `src` folder and run `npm install` to install all necessary dependencies.

# Running the Application

# (Front End)

1. Navigate to the `src` folder in your project directory
2. Run `npm install`
3. Run `npm start`
4. An instance of the applicaiton should open in your browser, if it doesn't navigate to http://localhost:3000

# (Back End)

1. Open up a separate instance of your your IDE and open the Java project
   a. Click Run & Debug on the left side panel if you're on Visual Studio Code
   b. Click Run & Debug to get the backend running and connected to the frontend

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/build) for more information.

## Coding standards

1. Elements with an 'id' will follow this format with dashes in between each name. i.e. 'my-named-id'
2. Elements with a 'name' will use normal CamelCase. i.e. 'myNameIs'
