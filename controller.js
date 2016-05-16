/**
 * Created by asistent on 14.05.2016.
 */

var TodoModel = require('./model').TodoModel;
var index = function (req, res) {
    res.render('index');
};

// Getting all tasks
var getting = function (req, res) {
    TodoModel.find({}, function (err, todos) {
        if (err) {
            return res.json({status: 'error'});
        }
        res.json({status: 'success', todo: todos});
    });
};

// Add task to collection
var add = function (req, res) {
    if ((req.body.title === '') && (req.body.description === '')) {
        return res.send({status: 'error'});
    }

    var todo = new TodoModel({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        completed: 0
    });

    todo.save(function (err) {
        if (err) {
            return res.send({status: 'error'});
        } else {
            return res.send({status: 'success', todo: todo});
        }
    });
};

// Change task description
var description = function (req, res) {
    return TodoModel.findById(req.body.id, function (err, todo) {
        if (!todo) {
            return res.send({status: 'error'});
        }

        todo.description = req.body.description;
        return todo.save(function (err) {
            if (err) {
                return res.send({status: 'error'});
            }
            res.send({status: 'success', todo: todo});
        });
    });
};

// Mark task as resolved
var completed = function (req, res) {
    return TodoModel.findById(req.body.id, function (err, todo) {
        if (!todo) {
            return res.send({status: 'error'});
        }
        var completed;
        if (todo.completed === true) {
            completed = 0;
        } else {
            completed = 1;
        }

        todo.completed = completed;
        return todo.save(function (err) {
            if (err) {
                return res.send({status: 'error'});
            }
            res.send({status: 'success', todo: todo});
        });
    });
};

// Delete task
var dell = function (req, res) {
    return TodoModel.findById(req.body.id, function (err, todo) {
        if (!todo) {
            return res.send({status: 'error'});
        }
        return TodoModel.remove({_id: req.body.id}, function (err) {
            if (err) {
                return res.send(err);
            }
            res.send({status: 'success'});
        });
    });
};

module.exports = {
    index: index,
    getting: getting,
    add: add,
    description: description,
    completed: completed,
    dell: dell
};