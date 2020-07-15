# Interview Scheduler

Interview Scheduler is a web app built with React.js. The data on the backend is ran by Express.js on an API server application.
Users can book, edit or delete an interview using an easy-to-navigate single page application.

## Tech Stack

React.js\
Webpack\
Babel\
Axios\
Storybook\
Jest testing library\
Cypress for end to end testing

## Setup

Install dependencies with `npm install` in the project folder

## Running Webpack Development Server
After the installation of the packages is finished, run the webpack server from the host machine with this command
```sh
npm start
```
## Running the API server

The API server is built in a different directory which you can fork and clone  https://github.com/Alshaikhly/scheduler-api
**Make sure you clone it in a different directory**
Install all dependencies then start the server up using the following commads
```sh
npm install
npm start
```
## Running Jest and Cypress Test Frameworks
You can run the Jest testing shceduler root directory
```sh
npm test
```
You can also run the Cypress tests using 
```sh
npm run cypress
```
## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Application Screenshots

["Selecting a day and adding a new appointment"](https://github.com/Alshaikhly/scheduler/blob/master/docs/Main%20page%20%26%20new%20appointment.png)
["Ability ti delete an interview with a warning message"](https://github.com/Alshaikhly/scheduler/blob/master/docs/deleting%20interview.png)