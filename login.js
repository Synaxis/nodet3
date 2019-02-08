const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path') 
const express = require('express')
const app = express()
const port = 80

//set sql parameters
//js sucks
var connection = mysql.createConnection({
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//display the login.html
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

//todo make it safe :( , dont use raw sql
app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            //TODO
            //if query || input contains '
            //response.end();
            //client = chrome/mozilla/safari/ie
                //if !client
                //response.end();

            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
                //todo don't send errors for hackers
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(port, () => console.log(`listening on port ${port}!`))