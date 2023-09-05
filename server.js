const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ip = '192.168.1.3';

const employee = require('./routes/employee');
const leaves = require('./routes/leaves');
const misc = require('./routes/misc');
const payroll = require('./routes/payroll');
const recruit = require('./routes/recruitment');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'destinyinfotech'
});

connection.connect(err => {
    if(err){
        console.log('connection failed');
    } else {
        console.log('connection succeded');
    }
});


app.get('/', (req, res) => {
    res.send({
        message: "welcome to destiny infotech"
    });
});


app.use('/employee', employee);
app.use('/leave', leaves);
app.use('/misc', misc);
app.use('/payroll', payroll);
app.use('/recruit', recruit);

app.listen(5000, () => { 
    console.log('app running on port 5000'); 
});



// app.get('/fetchEmployees', (req, res) => {
//     connection.query('SELECT * FROM employee', (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             // console.log("Leto ja : " + results);
//             // console.log(typeof(results[0].join_date.format));
//             // results[0].join_date += 1
//             res.send(results);
//         }
//     });
// })

// app.get('/fetchEmployeeNames/:id', (req, res) => {
//     connection.query('SELECT `name` FROM employee where id = ?', [req.params.id], (err, result) => {
//         if(err){
//             return res.send(err);
//         } else {
//             if(result.length === 1){
//                 return res.send(result[0]);
//                 console.log('maja aivi');
//             } else {
//                 console.log('maja na aivi');
//             }
//         }
//     })
// });

// app.post('/addEmployee', bodyParser.json(), (req, res) => {
//     const {name, designation, join_date} = req.body;

//     connection.query('INSERT INTO employee SET ? ', {name, designation, join_date}, (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             // console.log(res);
//             res.send(results);
//         }
//     });
// })


// app.delete('/removeEmployee/:id', (req, res) => {
//     const employeeId = req.params.id;
//     connection.query('DELETE FROM employee WHERE id = ? ', [employeeId], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// })


// app.put('/updateEmployee/:id', bodyParser.json(), (req, res) => {
//     const employeeId = req.params.id;
//     const {name, designation, join_date} = req.body;

//     connection.query('UPDATE employee SET ? WHERE id = ?', [{name, designation, join_date}, employeeId], (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         if(results.affectedRows === 0){
//             return res.send({
//                 message: "no record found"
//             });
//         }
//         return res.send({
//             message: "record updated successfully"
//         })
//     })
// })


// app.get('/truncateEmployees', (req, res) => {
//     connection.query('delete from employee', (err, result) => {
//         if(err){
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// });


// -------------------------------------------------------------Payroll-------------------------------------------

// app.get('/fetchPayrolls', (req, res) => {
//     connection.query('SELECT * FROM payroll', (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// });

// app.post('/addPayrolls', bodyParser.json(), (req, res) => {
//     const {employee_id, salary, employee_name} = req.body;
//     connection.query('INSERT INTO payroll SET employee_id=?, employee_name=?, salary=?', [employee_id, employee_name, salary], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// })

// app.delete('/removePayroll/:id', (req, res) => {
//     const payrollId = req.params.id;
//     connection.query('DELETE FROM payroll WHERE payroll_id = ? ', [payrollId], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// })

// app.put('/updatePayroll/:id', bodyParser.json(), (req, res) => {
//     const payrollId = req.params.id;
//     const {salary, employee_id} = req.body;

//     connection.query('UPDATE payroll SET ? WHERE payroll_id = ?', [{employee_id, salary}, payrollId], (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         if(results.affectedRows === 0){
//             return res.send({
//                 message: "no record found"
//             });
//         }
//         return res.send({
//             message: "record updated successfully"
//         })
//     })
// })

// app.get('/truncatePayrolls', (req, res) => {
//     connection.query('delete from payroll', (err, result) => {
//         if(err){
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// });



//------------------------Leaves-------------------------------------------------------------------------------

// app.get('/fetchLeaves', (req, res) => {
//     connection.query('SELECT * FROM `leaves`', (err, results) => {
//         if(err){
//             return res.send(err);
//         } else {
//             return res.send(results);
//         }
//     });
// });

// app.post('/addLeaves', bodyParser.json(), (req, res) => {
//     const {employee_id, employee_name, start_date, end_date} = req.body;
//     connection.query('INSERT INTO leaves SET ? ', [{start_date, end_date, employee_id, employee_name}], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// })

// app.delete('/removeLeaves/:id', (req, res) => {
//     const leave_id = req.params.id;
//     console.log(leave_id);
//     connection.query('DELETE FROM leaves WHERE leave_id = ? ', [leave_id], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// })

// app.put('/updateLeaves/:id', bodyParser.json(), (req, res) => {
//     const leavesId = req.params.id;
//     const {employee_id, employee_name, start_date, end_date} = req.body;

//     connection.query('UPDATE leaves SET ? WHERE leave_id = ?', [{employee_id, employee_name, start_date, end_date}, leavesId], (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         if(results.affectedRows === 0){
//             return res.send({
//                 message: "no record found"
//             });
//         }
//         return res.send({
//             message: "record updated successfully"
//         })
//     })
// })

// app.get('/truncateLeaves', (req, res) => {
//     connection.query('delete from leaves', (err, result) => {
//         if(err){
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// });



//------------------------Recruitment-------------------------------------------------------------------------------

// app.get('/fetchRecruits', (req, res) => {
//     connection.query('SELECT * FROM `recruitment`', (err, results) => {
//     if(err){
//         return res.send(err);
//     } else {
//         return res.send(results);
//     }
//     });
// });
// app.post('/addRecruits', bodyParser.json(), (req, res) => {
//     const {candidate_name, interview_date} = req.body;
//     console.log(candidate_name, interview_date)
//     connection.query('INSERT INTO recruitment SET ? ', [{candidate_name, interview_date}], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// });
// app.delete('/removeRecruits/:id', (req, res) => {
//     const candidate_id = req.params.id;
//     console.log(candidate_id);
//     connection.query('DELETE FROM recruitment WHERE candidate_id = ? ', [candidate_id], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results);
//         }
//     });
// });
// app.put('/updateRecruits', (req, res) => {});

// app.get('/truncateRecruits', (req, res) => {
//     connection.query('delete from recruitment', (err, result) => {
//         if(err){
//             res.send(err);
//         }
//         else {
//             res.send(result);
//         }
//     });
// });


//------------------------Performance Module-------------------------------------------------------------------------------

// app.get('/getModule1name/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     connection.query('SELECT name from employee where id = ?;', [id], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             res.send(results[0].name);
//         }

//     });
// });

// app.get('/getModule1totaldays/:id', (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     connection.query('SELECT join_date from employee where id = ?;', [id], (err, results) => {
//         if(err){
//             res.send(err);
//         } else {
//             // console.log(results[0].join_date);
//             console.log(Math.floor(new Date() - results[0].join_date) / (1000 * 60 * 60 * 24));
//         }

//     });
// });

// app.get('/countPresents/:id', (req, res) => {
//     const employee_id = req.params.id;
//     console.log(employee_id)
//     connection.query(`SELECT COUNT(*) FROM attendance WHERE employee_id = ? AND status = "Present";`, [employee_id],  (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         else {
//             console.log(results[0]["COUNT(*)"])
//             res.send(results[0]);
//         }
//     })
// });

// app.get('/countAbsents/:id', (req, res) => {
//     const employee_id = req.params.id;
//     console.log(employee_id)
//     connection.query(`SELECT COUNT(*) FROM attendance WHERE employee_id = ? AND status = "Absent";`, [employee_id],  (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         else {
//             console.log(results[0]["COUNT(*)"])
//             res.send(results[0]);
//         }
//     })
// });

// app.get('/getStatus/:id', (req, res) => {
//     const employee_id = req.params.id;
//     console.log(employee_id)
//     connection.query(`SELECT date, status FROM attendance WHERE employee_id = ?;`, [employee_id],  (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         else {
//             res.send(results);
//         }
//     })
// });

// app.get('/getTotalHours/:id', (req, res) => {
//     const employee_id = req.params.id;
//     console.log(employee_id)
//     connection.query(`SELECT SUM(hours) FROM attendance where employee_id = ?;`, [employee_id],  (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         else {
//             res.send(results[0]);
//         }
//     })
// })

// app.get('/getRecentWorkDates/:id', (req, res) => {
//     const employee_id = req.params.id;
//     console.log(employee_id)
//     connection.query(`SELECT hours FROM attendance where employee_id = ? LIMIT 5 ` , [employee_id],  (err, results) => {
//         if(err){
//             return res.send(err);
//         }
//         else {
//             console.log(results.map(obj => obj.hours))
//             return res.send(results.map(obj => obj.hours))
//         }
//     })   
// });

// app.post('/login', bodyParser.json(), (req, res) => {
//     const {email, password} = req.body;
//     if (email === 'admin@dsinfo.com' && password === 'admin@123'){
//         const secretKey = 'admin';
//         const payload = {
//             username: "admin"
//         } 
//         const options = {
//             expiresIn: '1h'
//         };
//         const token = jwt.sign(payload, secretKey, options);
//         res.status(200).send({
//             token: token
//         });
//     } else {
//         res.status(401).send({
//             message: "Invalid credentials"
//         });
//     }

// });
