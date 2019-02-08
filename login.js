const mysql = require('mysql')
const session = require('express-session')
const  bodyParser = require('body-parser')
const path = require('path') 
const express = require('express')
const app = express()
const port = 80
app.get('/', (req, res) => res.send('Server Online'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))