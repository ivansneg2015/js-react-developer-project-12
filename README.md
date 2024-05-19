# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `make -C frontend lint`
This task runs the make lint command in the frontend directory. It is used for checking the code against style and other linting rules.
### `npm ci`
This task installs the dependencies listed in the package-lock.json file using the npm ci command.
### `npm run postinstall`
This task runs the postinstall script defined in package.json.
### `make -C frontend start`
This task runs the make start command in the frontend directory, likely starting the frontend server.
### `npx start-server -s ./frontend/build`
This task starts the backend server using npx start-server and points to the compiled frontend files in ./frontend/build.
### `make start-backend & make start-frontend`
This task runs the start-backend and start-frontend commands in parallel. It is useful for local development where both servers need to be started simultaneously.
### `make start-backend`
This task only starts the backend server.
### `make install`
This task first installs the dependencies
### `make postinstall`
Then runs post-installation scripts 
### `rm frontend/build -rf`
Removes the frontend/build directory
### `npm run build`
Finally builds the project 

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
