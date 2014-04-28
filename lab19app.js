// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');
    ejs        = require('ejs');
    connect    = require('connect');
    
// Application initialization

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'kvasconcellos',
        password : '3475503'

    });

var dbToUse = 'kvasconcellos'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
    
//var app = module.exports = express.createServer();

var app = express();
var routes = require('./controller/index');
var artist = require('./controller/artist');

app.set('subtitle', 'Lab 19');
app.set('view engine','ejs');
app.set('views', 'views');


connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
	if(err) throw err;

	var createTableQry = 'CREATE TABLE IF NOT EXISTS Artists('
	+ 'id INT PRIMARY KEY,'
	+ 'ArtistName VARCHAR(50),'
	+ 'Genre VARCHAR(100),'
	+ 'FormedIn VARCHAR(5),'
	+ 'NumMembers INT'
	+ ')';
	connection.query(createTableQry, function(err) {
	    if (err) throw err;
	    });
	});
    });


console.log(__dirname + '/views');

//app.use(express.bodyParser());
app.use(connect.urlencoded());
app.use(connect.json());

app.use(express.static('public'));

// Main route sends our HTML file
/*
app.get('/', function(req, res) {
    res.render('lab18');
});

app.get('/enterArtist', function(req,res) {
    res.render('lab18part2');
*/
// create the ExampleDB if it does not exist.                                                                                                                                                         
var dbToUse = 'kvasconcellos'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
	if(err) throw err;

	 var createTableQry = 'CREATE TABLE IF NOT EXISTS Artists('
        + 'id INT PRIMARY KEY,'
        + 'ArtistName VARCHAR(50),'
        + 'Genre VARCHAR(100),'
        + 'FormedIn VARCHAR(5),'
        + 'NumMembers INT'
        + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});// res.sendfile('/lab18part2.ejs', {root:__dirname});



app.set('port', 8026);
app.use('/', routes);
app.use('/artist', artist);
app.listen(app.get('port'));
console.log("Express server listening on port %d in %s mode",  app.get('port'));
