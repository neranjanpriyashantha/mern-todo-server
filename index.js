const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./models/Todos')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/todoDB");

app.use(cors())
app.use(express.json());


app.post('/insert', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const todo = new TodoModel({ title: title, description: description });
    await todo.save();
    res.send(todo);
});

app.get("/read", async (req, res) => {
     TodoModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', async (req, res) => {
    const newTitle = req.body.newTitle;
    const newDescription=req.body.newDescription;
    const _id = req.body._id;
        try {
            await TodoModel.findById(_id, (error, todoToUpdate) => {
                if (error) {
                    console.log(error)
                } else {
                    todoToUpdate.title = newTitle;
                    todoToUpdate.description=newDescription;
                    todoToUpdate.save();
                }
            })
        } catch (err) {
            console.log(err);
        }
        res.send('updated!');
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await TodoModel.findByIdAndRemove(id).exec()
    res.send('item deleted')
});

app.listen(5000, () => {
    console.log('you are connected!');
});