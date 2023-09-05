const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ip = '192.168.1.3';
const router = express.Router();

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


router.get('/', (req, res) => {
    res.send({
        message: "welcome to payroll"
    });
});


router.get('/fetch', (req, res) => {
    connection.query('SELECT * FROM payroll', (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
});

router.post('/add', bodyParser.json(), (req, res) => {
    const {employee_id, salary, employee_name} = req.body;
    connection.query('INSERT INTO payroll SET employee_id=?, employee_name=?, salary=?', [employee_id, employee_name, salary], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
})

router.delete('/remove/:id', (req, res) => {
    const payrollId = req.params.id;
    connection.query('DELETE FROM payroll WHERE payroll_id = ? ', [payrollId], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
})

router.put('/update/:id', bodyParser.json(), (req, res) => {
    const payrollId = req.params.id;
    const {salary, employee_id} = req.body;

    connection.query('UPDATE payroll SET ? WHERE payroll_id = ?', [{employee_id, salary}, payrollId], (err, results) => {
        if(err){
            return res.send(err);
        }
        if(results.affectedRows === 0){
            return res.send({
                message: "no record found"
            });
        }
        return res.send({
            message: "record updated successfully"
        })
    })
})

router.get('/truncate', (req, res) => {
    connection.query('delete from payroll', (err, result) => {
        if(err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});


module.exports = router;