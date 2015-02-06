var User= require('../app/models/user');
var lineNumber = require('../app/models/lineNumber')
var configDB = require('../config/database.js');
var mongoose = require('mongoose');
var fs = require('fs')

mongoose.connect(configDB.url); // connect to our database



function initialize(){
	function addNumberToDatabase(number, callback){
		LineNumber.create({phoneNumber: number, available : true}, function(err, ln){

			if(err){
				console.log(err);
				callback();
			}
			else{
				console.log('adding number: ' + number);
				callback();
			}
		})
	}

	
	fs.readFile(__dirname + '/../config/lineNumbers.txt', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		var arr = data.split('\n');
	  	function iterate(item){
			if(item){
				addNumberToDatabase(item, function(){iterate(arr.shift())});	
			}else{
				process.exit();
			}
		}  		
  		iterate(arr.shift());
  	});
}

initialize();