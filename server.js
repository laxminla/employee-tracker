// Dependencies
const express = require('express')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// Connect to database
const connection = mysql.createConnection(
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
connection.connect(function (err) {
  if (err) throw err;
  console.log('SQL connected')
  start();
});


// Start
function start() {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee",
        "*** EXIT ***",
      ],
      message: "We have information on employees, departments, and employee roles. What would you like to do?",
    }
  ]).then(function (res) {
    switch (res.start) {
      case 'View Departments':
        viewDepartments();
        break;

      case 'View Roles':
        viewRoles();
        break;

      case 'View Employees':
        viewEmployees();
        break;

      case 'Add Department':
        addDepartment();
        break;

      case 'Add Role':
        addRole();
        break;

      case 'Add Employee':
        // addEmployee();
        break;

      case 'Update Employee':
        updateEmployee();
        break;

      default:
        console.log('-------------');
        console.log('All done');
        console.log('--------------');
        process.exit(1);
    }
  })
};

// view function
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(cTable.getTable(result));
    start();
  })
};

function viewRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(cTable.getTable(result));
    start();
  })
};

function viewEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(cTable.getTable(result));
    start();
  })
};


// Add function
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: 'What is the name of the new department?'
    }
  ]).then(function (res) {
    const query = "INSERT INTO department SET ?";
    connection.query(query, {
      department_name: res.departmentName
    });
    viewDepartments();
  })

};

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: 'What is the title of the new role?'
    },
    {
      type: "input",
      name: "roleSalary",
      message: 'What is the salary of the new role?'
    },
    {
      type: "input",
      name: "roleDepartmentId",
      message: 'What is the ID of the department for this role?'
    }
  ]).then(function (res) {
    const query = "INSERT INTO role SET ?";
    connection.query(query, {
      title: res.roleTitle,
      salary: res.roleSalary,
      department_id: res.roleDepartmentId
    });
    viewRoles();
  })

};


// Update function
function update() {
  inquirer.prompt([
    {
      type: "list",
      name: "update",
      choices: ['Department', 'Employee role', 'Employee'],
      message: 'What would you like to update?'
    }
  ]).then(function (res) {
    switch (res.update) {
      case 'Department':
        updateDepartment();
        break;
      case 'Employee role':
        updateEmployeeRole();
        break;
      case 'Employee':
        updateEmployee();
        break;
      default:
        console.log('default')

    }
  })

};






