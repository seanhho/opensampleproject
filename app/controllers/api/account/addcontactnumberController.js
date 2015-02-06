var Contact = require('../../../models/contact');
var User = require('../../../models/user');
var PushNotifications = require('../../../modules/pushNotifications');
function findRespectiveContactAndUser(id,number, callback){
	User.findOne({phoneNumber : number}, function(err,u){
		if(err)
			return callback(err);
		Contact.findOne({contactValue : number, contactType : "number"}, function(err,c){
			if(err)
				return callback(err);
			else
				return callback(err,u,c);
		})
	})
}

function updateUserContactList(id, toPush, callback){
	User.findByIdAndUpdate(id, {$push : {contactList : toPush}}, function(err){
		callback(err);
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

function addContact (user, number,callback){
	if(!number)
		return callback('phoneNumber null');

	findRespectiveContactAndUser(user.id, number, function(err, respectiveUser, respectiveContact){
		if(respectiveUser && respectiveContact){
			updateUserContactList(user.id,respectiveContact.id, function(err){
				updateRespectiveUser(user, respectiveUser, respectiveContact, function(err, u){
					return callback(err, respectiveContact);
				});
			})

		}else if(respectiveUser && !respectiveContact){
			Contact.create({
				contactValue : number,
				userId : respectiveUser.id,
				contactType : "number",
				smsConnectId : user.id //set when created
			}, function(err, newContact){
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
			Contact.create({
				contactValue : number,
				contactType : "number",
				smsConnectId : user.id//set when created
			}, function(err,newContact){
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
	var number = req.body.phoneNumber;
	if(!number)
		res.json({err : "missing phoneNumber param"});

	var user = req.user;
	addContact(user, number, function(err, c){
		res.json({err : err, response: c})
	})
}