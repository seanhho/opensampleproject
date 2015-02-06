var User = require('../../../models/contact')

function removeContact(user, contactId, callback){
	user.contactList.remove(contactId);
	user.save(callback);
}

exports.removeContact = removeContact;

exports.post = function(req,res){
	 var contactId = req.body.contactId
	 var user = req.user
	removeContact(user, contactId, function(err){
		if(err)
			return res.json({err : err, response : null});
		else
			return res.json({err : err, response : "success"});
	})
}