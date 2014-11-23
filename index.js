var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var commander = require('commander');
var http = require('http');
var server = http.createServer();
//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

commander
  .version('0.0.1')
  .option('-id, --id [value]', 'ID for this producer')
  .option('-rh, --redis-host [value]', 'Redis host to cionnect to.')
  .option('-rp, --redis-port [n]', 'Redis port to cionnect to.', parseInt)
  .parse(process.argv);

if(commander.id === undefined) commander.id = ((Math.random() + 10000000) % 10000000);
if(commander.redisHost === undefined) commander.redisHost = 'redis';
if(commander.redisPort === undefined) commander.redisPort = 6379;

var redis = require('redis'),
  client = redis.createClient( commander.redisPort, commander.redisHost);

var io = require('socket.io')(server);
io.on('connection', function(socket){
  //send the whole redis payload
  socket.on('event', function(data){

  });
  socket.on('disconnect', function(){

  });
});

server.listen(commander.expressPort);
