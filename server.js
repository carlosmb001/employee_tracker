const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config()


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect(err => {
  console.log(`Connected to the employee_db database.`);
  startProgram();
});

const promptUser = () => {
  inquirer.prompt([
    {type: 'list',
    name: 'choices',
    message: 'What would you like to do?',
    choices: [
      'View All Data',
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Update an Employee Manager',
      'View Employees by Manager',
      'View Employees by Department',
      'Delete a Department',
      'Delete a Role',
      'Delete an Employee',
      'Exit'
    ]}
  ]).then (answers => {
    const {choices} = answers;
    if (choices === 'View All Data') {
      viewAllData();
    }
    if (choices === 'View All Departments') {
      viewAllDepartments();
    }
    if (choices === 'View All Roles') {
      viewAllRoles();
    }
    if (choices === 'View All Employees') {
      viewAllEmployees();
    }
    if (choices === 'Add a Department') {
      addDepartment();
    }
    if (choices === 'Add a Role') {
      addRole();
    }
    if (choices === 'Add an Employee') {
      addEmployee();
    }
    if (choices === 'Update an Employee Role') {
      updateEmployeeRole();
    }
    if (choices === 'Update an Employee Manager') {
      updateEmployeeManager();
    }
    if (choices === 'View Employees by Manager') {
      viewEmployeesByManager();
    }
    if (choices === 'View Employees by Department') {
      viewEmployeesByDepartment();
    }
    if (choices === 'Delete a Department') {
      deleteDepartment();
    }
    if (choices === 'Delete a Role') {
      deleteRole();
    }
    if (choices === 'Delete an Employee') {
      deleteEmployee();
    }
    if (choices === 'Exit') {
      db.end();
    }
  });
};

// begins program and prompts user
startProgram = () => {
  promptUser();
}

viewAllData = () => {
const sql = `
SELECT * FROM department
INNER JOIN role ON department.id = role.department_id
INNER JOIN employee ON role.id = employee.role_id`

db.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.table(result);
});
}



viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    promptUser();
  });
}

viewAllRoles = () => {
  const sql = `
  SELECT * FROM department
  INNER JOIN role ON department.id = role.department_id`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    promptUser();
});
}

viewAllEmployees = () => {
  const sql = `
  SELECT * FROM department
  INNER JOIN role ON department.id = role.department_id
  INNER JOIN employee ON role.id = employee.role_id`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    promptUser();
});
}

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDpt',
      message: 'What is the name of the department?'
    }

  ]).then(answer => {
  const sql = `
  INSERT INTO department (name)
  VALUES (?)`;

  db.query(sql, answer.newDpt, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Department ${answer.newDpt} added successfully!`);
    promptUser();
});
});
}
