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
    res.send('welcome to leaves');
})

router.get('/fetch', (req, res) => {
    connection.query('SELECT * FROM `leaves`', (err, results) => {
        if(err){
            return res.send(err);
        } else {
            return res.send(results);
        }
    });
});

router.post('/add', bodyParser.json(), (req, res) => {
    const {employee_id, employee_name, start_date, end_date} = req.body;
    connection.query('INSERT INTO leaves SET ? ', [{start_date, end_date, employee_id, employee_name}], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
})

router.delete('/remove/:id', (req, res) => {
    const leave_id = req.params.id;
    console.log(leave_id);
    connection.query('DELETE FROM leaves WHERE leave_id = ? ', [leave_id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
})

router.put('/update/:id', bodyParser.json(), (req, res) => {
    const leavesId = req.params.id;
    const {employee_id, employee_name, start_date, end_date} = req.body;

    connection.query('UPDATE leaves SET ? WHERE leave_id = ?', [{employee_id, employee_name, start_date, end_date}, leavesId], (err, results) => {
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
    connection.query('delete from leaves', (err, result) => {
        if(err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});


module.exports = router;