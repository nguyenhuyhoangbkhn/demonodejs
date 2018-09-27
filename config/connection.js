var mysql = require('mysql');
var db;
var settings = ({
	host  :'localhost',
	user :'root',
	password : '',
	database : 'cmctest'
});

function connectDatabase() {
	// body...
	if (!db) {
		db = mysql.createConnection(settings);

		db.connect(function(err){
			if (!err) {
				console.log("Data connected");

			} else {
				console.log("die in here");
			}
		});
	}
	return db;
}

module.exports = connectDatabase();