var mongoose =require('mongoose');
var bodyParser = require("body-parser");

var data=[{item:'get milk'},{item:'walk dog'},{item:'else'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});
const url='mongodb+srv://test:test@cluster0.cknpr.mongodb.net/todo?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
};
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log("connected")
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
var todoSchema=new mongoose.Schema({
    item:String
});
var Todo=mongoose.model("todo",todoSchema);

module.exports=function(app){
    app.get('/todo',(req,res)=>{
        Todo.find({},(err,data)=>{
        if(err)throw err;
    res.render('todo',{todos:data})}
        );
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        var newTodo=Todo(req.body).save(function(err,data){
            if(err)
            throw err;
            res.json(data);
        })
    });
    app.delete('/todo/:item',(req,res)=>{
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove((err,data)=>{
            if(err)
        throw err;
    res.json(data);})
   

    });

};