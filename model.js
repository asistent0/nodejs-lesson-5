/**
 * Created by asistent on 13.05.2016.
 */

var mongoose = require('./mongooseDB'),
    TodoSchema = mongoose.Schema;

var Todo = new TodoSchema({
    title: String,
    date: {type: Date, default: Date.now},
    description: String,
    completed: Boolean
});

Todo.path('title').validate(function (v) {
    return v.length > 3 && v.length < 20;
});

var TodoModel = mongoose.model('Todo', Todo);

module.exports.TodoModel = TodoModel;