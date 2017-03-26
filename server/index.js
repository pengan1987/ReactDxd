var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = {
    firstName: String,
    lastName: String,
    email: String,
    age: Number
};

var Student = mongoose.model('Students', studentSchema, 'students');

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.get('/student', function (req, res) {
    Student.find().select('firstName age').exec(function (err, doc) {
        res.send(doc);
    })
});

app.get('/student/:id', function (req, res) {
    Student.findById(req.params.id, function (err, doc) {
        res.send(doc);
    });
});

app.post('/new', function (req, res) {
    var newStudent = new Student(req.body);
    newStudent.save(function (err, doc) {
        res.send(doc);
    });
});

app.post('/update/:id', function (req, res) {
    Student.update({_id: req.params.id}, {$set: req.body}, function (err, doc) {
        res.send(doc);
    });
});

app.post('/delete', function (req, res) {
    Student.remove({_id: req.body._id}, function (err, doc) {
        res.send(doc);
    })
});

app.get('/chat', function (req, res) {
    res.sendfile('./chat.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('chat message', function (msg) {
        console.log('message:' + msg);
        io.emit('chat message',msg);
    });
    socket.on('disconnect',function (msg) {
        console.log('a user disconnected')
    });
});

http.listen(3000);