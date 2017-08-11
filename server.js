var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var routes = require('./routes/routes');
var api = require('./routes/api');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//app.use('/', routes);
app.use('/api', api);
app.get('*', function(req, res) {
  res.render('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


app.listen(port, function() {
  console.log('Server started on port ' + port);
});
