// Dependencies
const express = require('express')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');
const cTable = require('console.table');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Diwaz',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
const app = express();
const PORT = process.env.PORT || 3001;


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// connection to mysql server and database
Connection.connect(function (err) {
  if (err) throw err;
  console.log('SQL connected')
  Start();
});



function start() {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      choices: ["View", "Add", "Update", "Exit"],
      message: "We have information on employees, departments, and employee roles. What would you like to do?",
    }
  ]).then(function (res) {
    switch (res.start) {
      case 'View':
        View();
        break;

      case 'Add':
        Add();
        break;

      case 'Update':
        updateEmployee();
        break;

      case 'Exit':
        console.log('-------------');
        console.log('All done');
        console.log('--------------');
        break;
      default:
        console.log('default')
    }
  })
};

// view function
function view() {
  inquirer.prompt([
    {
      type: "list",
      name: "view",
      choices: ['All employes', 'By department', 'By Role'],
      message: 'Select one to view'
    }
  ]).then(function (res) {
    switch (res.view) {
      case 'All employees':
        viewAllEmployees();
        break;
      case 'By department':
        viewByDeapartment();
        break;
      case 'By role':
        viewByRole();
        break;
      default:
        console.log('default')

    }
  });

}








