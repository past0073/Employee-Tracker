const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'employees_DB',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

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

        case 'View all employees by department':
          viewbyDept();
          break;

        case 'View all employees by manager':
          viewbyManager();
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
