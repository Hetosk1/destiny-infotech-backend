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
        message: "welcome to misc"
    });
});

router.get('/getModule1name/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    connection.query('SELECT name from employee where id = ?;', [id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results[0].name);
        }

    });
});

router.get('/getModule1totaldays/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    connection.query('SELECT join_date from employee where id = ?;', [id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            // console.log(results[0].join_date);
            console.log(Math.floor(new Date() - results[0].join_date) / (1000 * 60 * 60 * 24));
        }

    });
});

router.get('/countPresents/:id', (req, res) => {
    const employee_id = req.params.id;
    console.log(employee_id)
    connection.query(`SELECT COUNT(*) FROM attendance WHERE employee_id = ? AND status = "Present";`, [employee_id],  (err, results) => {
        if(err){
            return res.send(err);
        }
        else {
            console.log(results[0]["COUNT(*)"])
            res.send(results[0]);
        }
    })
});

router.get('/countAbsents/:id', (req, res) => {
    const employee_id = req.params.id;
    console.log(employee_id)
    connection.query(`SELECT COUNT(*) FROM attendance WHERE employee_id = ? AND status = "Absent";`, [employee_id],  (err, results) => {
        if(err){
            return res.send(err);
        }
        else {
            console.log(results[0]["COUNT(*)"])
            res.send(results[0]);
        }
    })
});

router.get('/getStatus/:id', (req, res) => {
    const employee_id = req.params.id;
    console.log(employee_id)
    connection.query(`SELECT date, status FROM attendance WHERE employee_id = ?;`, [employee_id],  (err, results) => {
        if(err){
            return res.send(err);
        }
        else {
            res.send(results);
        }
    })
});

router.get('/getTotalHours/:id', (req, res) => {
    const employee_id = req.params.id;
    console.log(employee_id)
    connection.query(`SELECT SUM(hours) FROM attendance where employee_id = ?;`, [employee_id],  (err, results) => {
        if(err){
            return res.send(err);
        }
        else {
            res.send(results[0]);
        }
    })
})

router.get('/getRecentWorkDates/:id', (req, res) => {
    const employee_id = req.params.id;
    console.log(employee_id)
    connection.query(`SELECT hours FROM attendance where employee_id = ? LIMIT 5 ` , [employee_id],  (err, results) => {
        if(err){
            return res.send(err);
        }
        else {
            console.log(results.map(obj => obj.hours))
            return res.send(results.map(obj => obj.hours))
        }
    })   
});

router.post('/login', bodyParser.json(), (req, res) => {
    const {email, password} = req.body;
    if (email === 'admin@dsinfo.com' && password === 'admin@123'){
        const secretKey = 'admin';
        const payload = {
            username: "admin"
        } 
        const options = {
            expiresIn: '1h'
        };
        const token = jwt.sign(payload, secretKey, options);
        res.status(200).send({
            token: token
        });
    } else {
        res.status(401).send({
            message: "Invalid credentials"
        });
    }

});


module.exports = router;