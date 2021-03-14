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
    connection.query(
        'SELECT first_name AS first, last_name AS last FROM employee',
            function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        }
    )
}

//Add employee
function addEmployee() {
    let roleArray = [];
        connection.query(
          "SELECT title, id FROM role",
            function (err, res) {  
                if (err) throw err;    
            for (var i=0; i<res.length; i++) {
                roleArray.push(
                    res[i].title
                )}
                console.log(roleArray);
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
        var first_name = res.first_name;
        var last_name = res.last_name;
        var role = res.role;
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + first_name + "', '" + last_name + "', (SELECT id FROM role WHERE title = '" + role + "'))",
            function (err, res) {
                if (err) throw err;
                console.log("Employee added successfully.")
                runSearch();
            }
        )
    })
})}

//Remove employee
function removeEmployee() {
    let employeeArray = [];
    connection.query(
        "SELECT first_name, last_name, id FROM employee",
        function (err, res) {
            console.log(res);
            if (err) throw err;
        for (i=0; i<res.length; i++) {
            employeeArray.push({
                name: res[i].first_name + " " + res[i].last_name, 
                id: res[i].id
            })
        }
        console.log(employeeArray);
    inquirer
        .prompt({
            type: 'list',
            name: 'remove',
            message: 'Which employee would you like to remove?',
            choices: employeeArray
        }).then((res) => {
            let removed = res.remove.split(" ");
            console.log(removed);
            connection.query(
                "DELETE FROM employee WHERE first_name = '" + removed[0] +"' AND last_name = '" + removed[1] + "'", 
                    function (err, res) {
                        if (err) throw err;
                        console.log("Employee deleted successfully.")       
                        runSearch();
                    }
            ) 
        })
    })}        

//Update employee role
function updateRole() {
    let employeeArray = [];
    let roleArray = [];
    connection.query(
        "SELECT first_name, last_name, id FROM employee",
        function (err, res) {
            console.log(res);
            if (err) throw err;
        for (i=0; i<res.length; i++) {
            employeeArray.push({
                name: res[i].first_name + " " + res[i].last_name, 
                id: res[i].id
            })
        } 
    inquirer
        .prompt({
            type: 'list',
            name: 'name',
            message: "Which employee's role would you like to update?",
            choices: employeeArray
        }).then((res) => {
        let chosen = res.name.split(" ");  
        connection.query(
            "SELECT title FROM role",
            function (err, res) {
                if (err) throw err;
                for (i=0; i<res.length; i++) {
                    roleArray.push(res[i].title)
                }
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'role',
                        message: "Select the employee's new role.",
                        choices: roleArray
                    }).then((res) => {
                        let first = chosen[0];
                        let last = chosen[1];
                        let newRole = res.role;
                    connection.query(
                        "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '" + newRole + "') WHERE first_name = '" + first + "' AND last_name = '" + last + "'",
                        function (err, res) {
                            if (err) throw err;
                            console.log("Employee role updated successfully.");
                            runSearch();
                        }
                    )
                    })
            }
        )
        })
})}
// 'Update employee manager',
// 'View all departments',
// 'Add department',
// 'Remove department',
// 'View all roles',
// 'Add role',
// 'Remove role',
