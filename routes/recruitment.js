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
        message: "welcome to recruits"
    });
});

router.get('/fetch', (req, res) => {
    connection.query('SELECT * FROM `recruitment`', (err, results) => {
    if(err){
        return res.send(err);
    } else {
        return res.send(results);
    }
    });
});
router.post('/add', bodyParser.json(), (req, res) => {
    const {candidate_name, interview_date} = req.body;
    console.log(candidate_name, interview_date)
    connection.query('INSERT INTO recruitment SET ? ', [{candidate_name, interview_date}], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
});
router.delete('/remove/:id', (req, res) => {
    const candidate_id = req.params.id;
    console.log(candidate_id);
    connection.query('DELETE FROM recruitment WHERE candidate_id = ? ', [candidate_id], (err, results) => {
        if(err){
            res.send(err);
        } else {
            res.send(results);
        }
    });
});
router.put('/update', (req, res) => {});

router.get('/truncate', (req, res) => {
    connection.query('delete from recruitment', (err, result) => {
        if(err){
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

module.exports = router;