const mysql = require('mysql')
const session = require('express-session')
const  bodyParser = require('body-parser')
const path = require('path') 
const express = require('express')
const app = express()
const port = 80

//set sql parameters
var dbConn = mysql.createConnection({
    host:   '172.18.0.1', //TODO get docker ip automatically
    user:   'root',
    password: '1234',
    database: 'testLogin'
});


app.get('/', (req, res) => res.send('Server Online'))

app.listen(port, () => console.log(`listening on port ${port}!`))