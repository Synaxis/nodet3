const mysql = require('mysql')
const session = require('express-session')
const  bodyParser = require('body-parser')
const path = require('path') 
const express = require('express')
const app = express()
const port = 80

//set sql parameters
var dbConn = mysql.createConnection({
    host:   '172.18.0.2', //TODO get docker ip automatically
    user:   'root',
    password: '1234',
    database: 'testLogin'
});

app.use(session({
    secret: 'secret',
    resave: 'true',
    saveUnitialized: true
}));

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyParser.json());

//display the login.html
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});



// app.get('/', (req, res) => res.send('Server Online'))

// app.listen(port, () => console.log(`listening on port ${port}!`))