var Contact = require('../../../models/contact')
var User = require('../../../models/user')
var PushNotifications = require('../../../modules/pushNotifications');

function findRespectiveContactAndUser(id,email, callback){
	User.findOne({emailAddress : email}, function(err,u){
		if(err)
			return callback(err);
		Contact.findOne({contactValue : email, contactType : "email"}, function(err,c){
			if(err)
				return callback(err);
			else
				return callback(err,u,c);
		})
	})
}

function updateRespectiveUser(sender, respectiveUser, respectiveContact, callback){
	Contact.findOne({contactType : "number", contactValue : sender.phoneNumber}, function(err, senderc){
		if(!senderc){
			Contact.create({contactType : "number", contactValue : sender.phoneNumber, userId : sender.id}, function(err, newContact){
				respectiveUser.contactList.push(newContact.id);
				respectiveUser.save(function(err, u){
				PushNotifications.addedAsContact(newContact, sender, respectiveUser, function(){
					return callback(err, respectiveContact);
				});
				});
			});
		}else{
			respectiveUser.contactList.push(senderc.id);
			respectiveUser.save(function(err, u){
				PushNotifications.addedAsContact(senderc, sender, respectiveUser, function(){
					return callback(err, respectiveContact);
				});
			});
		}
		
	})
	
}

function updateUserContactList(id, toPush, callback){
	User.findByIdAndUpdate(id, {$push : {contactList : toPush}}, function(err){
		callback(err);
	})
}
function addContact (user, email,callback){
	if(!email)
		return callback('email null');

	findRespectiveContactAndUser(user.id, email, function(err, respectiveUser, respectiveContact){
		if(respectiveUser && respectiveContact){
			updateUserContactList(user.id,respectiveContact.id, function(err){
				updateRespectiveUser(user, respectiveUser, respectiveContact, function(err, u){
					return callback(err, respectiveContact);
				})
				
			})

		}else if(respectiveUser && !respectiveContact){
			Contact.create({contactValue : email, contactType : "email", userId : respectiveUser.id}, function(err, newContact){
				updateUserContactList(user.id,newContact.id, function(err){
					updateRespectiveUser(user, respectiveUser, newContact, function(err, u){
					return callback(err, newContact);
					});
				})
			})
			
		}else if(!respectiveUser && respectiveContact){			
			updateUserContactList(user.id,respectiveContact.id, function(err){
				return callback(err, respectiveContact);
			})

		}else {//!respectiveUser && !respectiveContact
			Contact.create({contactValue : email, contactType : "email"}, function(err,newContact){
				if(err)
					return callback(err);

				updateUserContactList(user.id,newContact.id, function(err){
					return callback(err,newContact);
				});	
			});
		}
	})
}

exports.addContact = addContact;

exports.post = function (req,res){
	var email = req.body.emailAddress;
	if(!email)
		res.json({err : "missing email param"});

	var user = req.user;
	addContact(user, email, function(err, c){
		res.json({err : err, response: c})
	})
}