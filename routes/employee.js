const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
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
        message: "welcome to employees"
    });
});


router.get('/fetch', (req, res) => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if(err){
            res.send(err);
        } else {
            // console.log("Leto ja : " + results);
            // console.log(typeof(results[0].join_date.format));
            // results[0].join_date += 1
            res.send(results);
        }
    });
})

router.get('/fetch/:id', (req, res) => {
    connection.query('SELECT `name` FROM employee where id = ?', [req.params.id], (err, result) => {
        if(err){
            return res.send(err);
        } else {
            if(result.length === 1){
                return res.send(result[0]);
                console.log('maja aivi');
            } else {
                console.log('maja na aivi');
            }
        }
    })
});

router.post('/add', bodyParser.json(), (req, res) => {
    const {name, designation, join_date} = req.body;

    connection.query('INSERT INTO employee SET ? ', {name, designation, join_date}, (err, results) => {
        if(err){
            res.send(err);
        } else {
            // console.log(res);
            res.send(results);
        }
    });
})


router.delete('/remove/:id', (req, res) => {
    const employeeId = req.params.id;
    connection.query('DELETE FROM employee WHERE id = ? ', [employeeId], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
})


router.put('/update/:id', bodyParser.json(), (req, res) => {
    const employeeId = req.params.id;
    const {name, designation, join_date} = req.body;

    connection.query('UPDATE employee SET ? WHERE id = ?', [{name, designation, join_date}, employeeId], (err, results) => {
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
    connection.query('delete from employee', (err, result) => {
        if(err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});


module.exports = router;
