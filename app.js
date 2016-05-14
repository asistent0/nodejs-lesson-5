/**
 * Created by asistent on 13.05.2016.
 */

var bodyParser = require('body-parser'),
    path = require('path'),
    template = require('consolidate').jade,
    express = require('express'),
    config = require('./config'),
    todoController = require('./controller');

var app = express();

app.engine('jade', template);

app.set('view engine', 'jade');
app.set(express.static(path.join(__dirname, '/views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', todoController.index);
app.post('/', todoController.getting);
app.post('/add', todoController.add);
app.post('/description', todoController.description);
app.post('/completed', todoController.completed);
app.post('/dell', todoController.dell);

app.listen(config.get('port'), function () {
    console.log('Server is launched on: http://localhost:' + config.get('port'))
});