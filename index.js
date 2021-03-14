const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const employee = require('./models/employee');
const role = require('./models/role');
const department = require('./models/department');
const figlet = require('figlet');
const chalk = require('chalk');


connection.connect((err) => {
    if (err) throw err;
    displayTitle();
    runSearch();
  });

function displayTitle() {
    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log();
        console.log(chalk.yellowBright(data))
    });
}

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all employees by department',
        'View all employees by manager',
        'Add employee',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        'View all departments',
        'Add department',
        'Remove department',
        'View all roles',
        'Add role',
        'Remove role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          viewAll();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Remove employee':
          removeEmployee();
          break;

        case 'Update employee role':
            updateRole();
            break;

        case 'Update employee manager':
            updateManager();
            break;
        
        case 'View all departments':
            viewDepartments();
            break;
            
        case 'Add department':
            addDepartment();
            break;

        case 'Remove department':
            removeDepartment();
            break;
        
        case 'View all roles':
            viewRoles();
            break;

        case 'Add role':
            addRole();
            break;

        case 'Remove role':
            removeRole();
            break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


//View all employees
function viewAll() {
    const query = 'SELECT first_name, last_name FROM employee';
    connection.query(
        query, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        }
    )
}

// 'Add employee',
const addEmployee = () => {
        //Push all roles into one array
        const roles = connection.query("SELET title FROM role");
        let roleArray = [];
        for (i=0; i<roles.length; i++) {
            roleArray.push(
                roles[i].title
            )}
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roleArray
            },
        ]
    ).then((res) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: res.first_name,
                last_name: res.last_name,
                role: res.role,
            },
            function (err, res) {
                if (err) throw err;
                console.log("Employee added successfully.")
            }
        )
    })
}
// 'Remove employee',
// const removeEmployee = () => {
//     const employees = connection.query("SELECT first_name, last_name, id FROM employees");
//     let employeeArray = [];
//     for (i=0; i<employees.length; i++) {
//         employeeArray.push({
//             name: employees[i].first_name + " " + employees[i].last_name,
//             id: employees[i].id
//         })
//     }
//     inquirer
//         .prompt({
//             type: 'list',
//             name: 'remove',
//             message: 'Which employee would you like to remove?',
//             choices: employeeArray,
//         }).then((answer) => {
//             const query = 'DELETE * FROM employees WHERE ?';  
//             connection.query(
//                 query, { id: answer.id }, (err, res) => {
//                     if (err) throw err;
//                     //display updated list             
//                     runSearch();
//                 }
//             ) 
//         })
            
// }
// 'Update employee role',
// 'Update employee manager',
// 'View all departments',
// 'Add department',
// 'Remove department',
// 'View all roles',
// 'Add role',
// 'Remove role',
