var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* Example 2 - Create User */

router.get('/artist', function(req, res) {
    res.render('lab18part2.ejs');
});

/*
router.post('/artist', function (req, res) {
    connection.query('INSERT INTO User SET ?', req.body,
        function (err, result) {
            if (err) throw err;

            if(result.UserID != 'undefined') {
                var placeHolderValues = {
                    email: req.body.email,
                    password: req.body.password
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});
*/

router.get('/artists', function(req, res) {
    var query = 'select ArtistName, Genre, FormedIn, NumMembers WHERE ArtistName = ' + req.query.artist-name;
    console.log(req.query);
    connection.query(query,
	 function(err, result) {
		 res.render('lab18part2.ejs', {rs: result});
			 }
		     );
    });

/* Example 3 - View all users */
router.get('/artist', function (req, res) {
    connection.query('select ArtistName, Genre, FormedIn, NumMembers from Artists WHERE ArtistName = ' + req.query.artist-name,
        function (err, result) {
            res.render('artist.ejs', {rs: result});
        }
    );
});

/* View a single user */
router.get('/user', function (req, res) {
    var query = 'select UserID, Email from User WHERE UserID = ' + req.query.userid;
    console.log(req.query);
    connection.query(query,
        function (err, result) {
            if(typeof result != 'undefined' && result.length > 0) {
                //NOTE: We are using the same template here as for the view of all users                                                                                                              
                res.render('displayUserTable', {rs: result});
            }
            else {
                res.send('No users exist.');
            }
        }
    );
});

module.exports = router;
