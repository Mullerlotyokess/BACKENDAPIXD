require("dotenv").config();
const express = require("express");
var mysql = require("mysql");

const app = express();
const port = process.env.PORT;
const cors = require("cors");

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone        : 'UTC'
});

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

// ENDPOINTS

app.post("/dolgozat", (req, res) =>{
    pool.query(`INSERT INTO dolgozat VALUES (null, '${req.body.name}', '${req.body.title}', '${req.body.desc}' , '${req.body.date}' , '${req.body.victim}' , '${req.body.grade}')`, (err, results) => {
        sendResults(err, results, req, res, "insert into");
    });
})

app.get("/dolgozat", (req, res) =>{
    pool.query(`SELECT * FROM dolgozat`, (err, results) => {
        sendResults(err, results, req, res, "sent from");
    });
})

app.get("/dolgozat/:id", (req, res) =>{
    pool.query(`SELECT * FROM dolgozat WHERE ID = ${id}`, (err, results) => {
        sendResults(err, results, req, res, "sent from");
    });
})

app.patch("/dolgozat", (req, res) =>{
    
})

app.delete("/dolgozat", (req, res) =>{
    pool.query(`DELETE FROM dolgozat`, (err, results) =>{
        sendResults(err, results, req, res, 'deleted from');
    });
})

app.delete("/dolgozat/:id", (req, res) =>{
    pool.query(`DELETE FROM dolgozat WHERE ID = ${id}`, (err, results) =>{
        sendResults(err, results, req, res, 'deleted from');
    });
})

function sendResults(err, results, req, res, msg){
    if (err){
        console.log(" >> " + err.sqlMessage);
        res.status(500).send(err.sqlMessage);
    }
    else{
        console.log(" >> " + results.length + ` record(s) ${msg} dolgozat table.`);
        res.status(200).send(results);
    }
}


function getOperator(op){
    switch (op){
        case "eq": op = "=";break;
        case "lt": op = "<";break;
        case "gt": op = ">";break;
        case "lte": op = "<=";break;
        case "gte": op = ">=";break;
        case "not": op = "!=";break;
        case "lk": op = "like";break;
    }
    return op
}

function validation()
{

}

app.listen(port, () =>{
    console.log(`Server listening on port ${port}...`);
})