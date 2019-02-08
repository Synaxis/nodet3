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



// app.get('/', (req, res) => res.send('Server Online'))

// app.listen(port, () => console.log(`listening on port ${port}!`))