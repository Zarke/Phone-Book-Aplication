var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbConnect = require('./app/dbConnect.js');


app.use(bodyParser.urlencoded({'extended':true}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                   // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.use(express.static('app'));
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 })

// This responds a POST request for returning al users
app.get('/users', (req, res) => {
   dbConnect.query("SELECT * FROM entries", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
    }); 
})

app.post('/user',  (req, res) => {
    let userInfo = req.body;
    let sql = "INSERT INTO entries SET ?";
    dbConnect.query(sql,userInfo, (err, result) =>{
     if (err) throw err; 
     }); 
 })

// This responds a DELETE request for the /del_user page.
app.delete('/user/:id', (req, res) =>{
    let userID = req.params.id;
    dbConnect.query("DELETE FROM entries WHERE entryID = "+userID, (err, result) =>{
        if (err) throw err;
        console.log(res.affectedRows);
        }); 
})


let server = app.listen(8081, () =>{

   let host = server.address().address
   let port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})