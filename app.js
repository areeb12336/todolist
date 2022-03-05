var express= require('express');

const todocontroller = require('./controllers/todocontroller');
var todoController=require('./controllers/todocontroller');
var app=express();
app.set('view engine','ejs');
app.use(express.static('./public'));

todocontroller(app);

app.listen(3000);
        console.log("listening to port 3000");

