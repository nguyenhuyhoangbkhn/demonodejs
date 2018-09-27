var express = require('express');
var router = express.Router();
var connection = require('../config/connection.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
   connection.query('SELECT * FROM user',function(err,rows){
  	console.log(rows);
  	if (err) throw err;
	  	res.render('index', { 
	  		title: 'CMC Global trainning nodejs' ,
	  		userList : rows,
	  		id : '',
	  		lastname : '',
	  		firstname : '',
	  		name : '',
	  		address : ''
	  	});
  });
});


// ADD USER FORM
router.post('/addUser', function(req, res, next){
	var id = req.body.id;
	console.log("id " + id);
	if (id > 0) {
		var sql = "UPDATE user SET firstname = '" + req.body.firstname + "' , lastname = '"
				+ req.body.lastname + "' , name = '"  + req.body.name + "' , address = '"  +
				req.body.address + "' WHERE id =  "  + req.body.id ;
		connection.query(sql,function(err,rows){
		  	console.log(rows);
		  	if (err) throw err;
			res.redirect('/');
		});
	} else {
		var sql = "INSERT INTO user (firstname, lastname, name,address) VALUES ( ' "+
				req.body.firstname + "' , '" + req.body.lastname + "' , '"  +
				req.body.name + "' , '" + req.body.address + "'); " ;
		connection.query(sql,function(err,rows){
		  	console.log(rows);
		  	if (err) throw err;
			res.redirect('/');
		});
	}
	
});

//redictrect update
router.get('/editUser/(:id)', function(req, res, next){
	var sql = "SELECT * FROM user WHERE id = " + req.params.id;
	console.log("sql" + sql);
	connection.query(sql,function(err,rows){
		if (err) throw err;
  		var lastname = rows[0].lastname;
		var firstname = rows[0].firstname;
		var name = rows[0].name;
		var address = rows[0].address;
		var id = rows[0].id;

		connection.query('SELECT * FROM user',function(err,rows){
		  	console.log(rows);
		  	if (err) throw err;
		  	res.render('index', { 
		  		title: 'CMC Global trainning nodejs' ,
		  		userList : rows,
		  		id : id,
		  		lastname : lastname,
		  		firstname : firstname,
		  		name : name,
		  		address : address
		  	});
		  });
	  	
  	});
});

//DELETE
router.get('/deleteUser/(:id)', function(req, res, next){
	var sql = "DELETE FROM user WHERE id = " + req.params.id;
	connection.query(sql,function(err,rows){
	  	console.log(rows);
	  	if (err) throw err;
		res.redirect('/');
	});
});

module.exports = router;
