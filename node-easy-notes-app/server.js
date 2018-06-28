const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const dbconfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.connect(dbconfig.url)
        .then(()=>{
            console.log("Successfully connected to the databse");
        })
        .catch((err)=>{
            console.log("Could not connect to the database" + err);
            process.exit();
        });

app.get('/',(req,res)=>{
    res.json({"message":"Welcome to Easy Note API"});
});

require('./app/routes/note.routes')(app);
//Same code for above line
// var func = require('./app/routes/note.routes');
// func(app);

var server = app.listen(4000,()=>{
    console.log("Server is Listening on port 4000");
});