var Contact = require('../../../models/contact')
var User = require('../../../models/user')


function showContacts (user, callback){
	var contactList = user.contactList;
	var arr = [];
	function series(id){
		 if(id) {
		 	Contact.findById(id, function(err, c){
		 		arr.push(c);
		 		return series(contactList.shift());
		 	})
		  } else {
		    return callback(null, arr);
		  }
	}
	series(contactList.shift());
	
}

exports.showContacts = showContacts;

exports.post = function(req,res){

	showContacts(req.user, function(err,arr){
		res.json({err : null, response : arr});
	})
	
}