/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./config/routes');
var http = require('http');
var path = require('path');

//var app = express();
var app = exports.app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('view cache', true);
app.set('views', path.join(__dirname, 'app/views'));

// Jade
app.set('view engine', 'jade');
//Html
//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/pixes', routes.index);
app.get('/pixes.html', routes.index);

http.createServer(app).listen(app.get("port"), function () {
	console.log("PhotoRush Www server listening on port " + app.get("port"));
});