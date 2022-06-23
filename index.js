const express=require('express');
const app=express();
const mongoose=require('mongoose');
const TodoModel =require('./models/Todos')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/todoDB");

app.get('/insert', async (req,res)=>{
    const  todo=new TodoModel({title:'nera',description:'my description'});
    await todo.save();
    res.send()
});

app.listen(5000,()=>{
    console.log('you are connected!');
});