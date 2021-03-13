const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const figlet = require('figlet');

connection.connect((err) => {
    if (err) throw err;
    runSearch();
  });

function displayTitle() {
    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
}
displayTitle();

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

runSearch();

//'View all employees'
function viewAll() {
    const query = 'SELECT * FROM employees';
    connection.query(
        query, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        }
    )
}

// 'Add employee',
const addEmployee = () =>
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
                choices: ["Work Coordinator", "Job Coach", "Supervisor", "Manager"],
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ["Katie O", "Amy P", "Karen J", "Sami O"],
            },
        ]
    ).then((res) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: res.first_name,
                last_name: res.last_name,
                role: res.role,
                manager: res.manager
            },
            function (err, res) {
                if (err) throw err;
                console.log("Employee added successfully.")
            }
        )
    })

// 'Remove employee',
const removeEmployee = () => {
    const employees = connection.query("SELECT first_name, last_name, id FROM employees");
    let employeeArray = [];
    for (i=0; i<employees.length; i++) {
        employeeArray.push({
            name: employees[i].first_name + " " + employees[i].last_name,
            id: employees[i].id
        })
    }
    inquirer
        .prompt({
            type: 'list',
            name: 'remove',
            message: 'Which employee would you like to remove?',
            choices: employeeArray,
        }).then((answer) => {
            const query = 'DELETE * FROM employees WHERE ?';  
            connection.query(
                query, { id: answer.id }, (err, res) => {
                    if (err) throw err;
                    //display updated list             
                    runSearch();
                }
            ) 
        })
            
}
// 'Update employee role',
// 'Update employee manager',
// 'View all departments',
// 'Add department',
// 'Remove department',
// 'View all roles',
// 'Add role',
// 'Remove role',

// const artistSearch = () => {
//   inquirer
//     .prompt({
//       name: 'artist',
//       type: 'input',
//       message: 'What artist would you like to search for?',
//     })
//     .then((answer) => {
//       const query = 'SELECT position, song, year FROM top5000 WHERE ?';
//       connection.query(query, { artist: answer.artist }, (err, res) => {
//         if (err) throw err;
//         res.forEach(({ position, song, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const multiSearch = () => {
//   const query =
//     'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
//   connection.query(query, (err, res) => {
//     if (err) throw err;
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'start',
//         type: 'input',
//         message: 'Enter starting position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: 'end',
//         type: 'input',
//         message: 'Enter ending position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         if (err) throw err;
//         res.forEach(({ position, song, artist, year }) =>
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           )
//         );
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: 'song',
//       type: 'input',
//       message: 'What song would you like to look for?',
//     })
//     .then((answer) => {
//       console.log(`You searched for "${answer.song}"`);
//       connection.query(
//         'SELECT * FROM top5000 WHERE ?',
//         { song: answer.song },
//         (err, res) => {
//           if (err) throw err;
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//             runSearch();
//           } else {
//             console.error('Song not found :(\n');
//             runSearch();
//           }
//         }
//       );
//     });
// };
