var mysql = require('mysql');
var express = require('express');
var router = express.Router();

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection({
    host:       'cwolf.cs.sonoma.edu',
    user:       'kvasconcellos',
    password:   '3475503'
});

// create the ExampleDB if it does not exist.                                                                                                                                                         
var dbToUse = 'kvasconcellos'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if(err) throw err;

    var useDatabaseQry = 'USE ' + dbToUse;

    connection.query(useDatabaseQry, function(err) {
	if(err) throw err;

	var createTableQry = 'CREATE TABLE IF NOT EXISTS User('
            + 'UserID INT AUTO_INCREMENT PRIMARY KEY'
            + ',Email VARCHAR(256)'
            + ',Password VARCHAR(50)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});

exports.GetAll = function(callback) {
    connection.query('select ArtistName, Genre, FormedIn, NumMembers from Artists WHERE ArtistName = ' + req.query.artist-name,
		     function(err, result) {
			 if(err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
			 callback(false, result);
			 }
		     );
    }
    

router.get('/artist', function(req, res) {
    db.GetAll(function(err, result) {
	if(err) throw err;
	res.render('lab18part2.ejs', {rs:result});
	}
	      );
});

router.get('/all', function(req, res) {
    db.GetAll(function(err, result) {
	if(err) throw err;
	res.render('lab18.ejs', {rs: result});
	}
    );
});
