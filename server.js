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

//view all data
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
  startProgram();
});
}


//view all departments
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

//view all roles
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

//view all employees
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

//adds a department to data base
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

//adds a role to data base
addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'newSalary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'input',
      name: 'newDptId',
      message: 'What is the department id of the role?'
    }

  ]).then(answer => {
  const sql = `
  INSERT INTO role (title, salary, department_id)
  VALUES (?, ?, ?)`;

  db.query(sql, [answer.newRole, answer.newSalary, answer.newDptId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Role ${answer.newRole} added successfully!`);
    promptUser();
});
});
}

//adds an employee to data base
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newFirstName',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'newLastName',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'What is the role id of the employee?'
    },
    {
      type: 'input',
      name: 'newManagerId',
      message: 'What is the manager id of the employee?'
    }

  ]).then(answer => {
  const sql = `
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?, ?, ?, ?)`;

  db.query(sql, [answer.newFirstName, answer.newLastName, answer.newRoleId, answer.newManagerId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Employee ${answer.newFirstName} ${answer.newLastName} added successfully!`);
    promptUser();
});
});
}

//updates an employee role
updateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'What is the id of the employee?'
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'What is the new role id of the employee?'
    }

  ]).then(answer => {
  const sql = `
  UPDATE employee SET role_id = ?
  WHERE id = ?`;

  db.query(sql, [answer.newRoleId, answer.employeeId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Employee ${answer.employeeId} role updated successfully!`);
    promptUser();
});
});
}

//updates an employee manager
updateEmployeeManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'What is the id of the employee?'
    },
    {
      type: 'input',
      name: 'newManagerId',
      message: 'What is the new manager id of the employee?'
    }

  ]).then(answer => {
  const sql = `
  UPDATE employee SET manager_id = ?
  WHERE id = ?`;

  db.query(sql, [answer.newManagerId, answer.employeeId], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Employee ${answer.employeeId} manager updated successfully!`);
    promptUser();
});
});
}

//view employees by manager
viewEmployeesByManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the id of the manager?'
    }

  ]).then(answer => {
  const sql = `
  SELECT * FROM employee
  WHERE manager_id = ?`;

  db.query(sql, answer.managerId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    promptUser();
});
});
}

//view employees by department
viewEmployeesByDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentId',
      message: 'What is the id of the department?'
    }

  ]).then(answer => {
  const sql = `
  SELECT * FROM department
  INNER JOIN role ON department.id = role.department_id
  INNER JOIN employee ON role.id = employee.role_id
  WHERE department.id = ?`;

  db.query(sql, answer.departmentId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(result);
    promptUser();
});
});
}

/*deleteDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentId',
      message: 'What is the id of the department?'
    }

  ]).then(answer => {
  const sql = `
  DELETE FROM department
  WHERE id = ?`;

  db.query(sql, answer.departmentId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Department ${answer.departmentId} deleted successfully!`);
    promptUser();
});
});
}

deleteRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the id of the role?'
    }

  ]).then(answer => {
  const sql = `
  DELETE FROM role
  WHERE id = ?`;

  db.query(sql, answer.roleId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Role ${answer.roleId} deleted successfully!`);
    promptUser();
});
});
}
*/
//deletes an employee from data base
deleteEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'What is the id of the employee?'
    }

  ]).then(answer => {
  const sql = `
  DELETE FROM employee
  WHERE id = ?`;

  db.query(sql, answer.employeeId, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Employee ${answer.employeeId} deleted successfully!`);
    promptUser();
});
});
}

