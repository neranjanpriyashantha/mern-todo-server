const express=require('express');
const app=express();
const mongoose=require('mongoose');
const TodoModel =require('./models/Todos')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/todoDB");

app.get('/insert', async (req,res)=>{
    const  todo=new TodoModel({title:'nera',description:'my description'});
    await todo.save();
    res.send("inserted data!");
});

app.get("/read", async (req,res)=>{
    TodoModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(5000,()=>{
    console.log('you are connected!');
});