const express = require('express');
const app=express();
const port=process.env.PORT ||3000;
const mysql =require('mysql');
const all = require('./routes/all_post_api');
const hof =require('./routes/hall_of_fame');
const allpost= require('./modules/allPostModule');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password1!',
    database: 'tets'
});

// connect to database
mc.connect();

app.listen(port);
console.log('API server started on:'+ port);


app.get('/',(err,res) => {
    res.sendFile('test.html');
})
app.get('/all',all);
app.get('/hall_of_fame',hof);
