var User = require('../../models/user')
var VerifyCode = require('../../models/verifyCode')
var RandomToken = require('../../modules/randomToken')
var Contact = require('../../models/contact')
var firebase = require('../../modules/firebase')
var dateformat = require('dateformat')
var Pushnotifications = require('../../modules/pushNotifications');

var NO_NUMBER_OR_TOKEN = "invalid number or token"

function createContactAndAddContactToSupport(createdUser, callback){
	Contact.create({contactType : "number", contactValue : createdUser.phoneNumber, userId : createdUser.id}, function(err, c){
		if(err)
			return callback(err);
		var supportId = '5491f3803b2589020054809a';
		User.findByIdAndUpdate(supportId, {$push : {contactList : c.id}}, function(err){
			return callback(err);
		})
	})
	
}

function addSupportContactAndMessage(u,callback){
	var contactId = '549325a08857aeba8c001004';
	u.contactList.push(contactId);

	var senderId = '5491f3803b2589020054809a';
	u.save(function(err){
		var firebaseNode = {
				sender: senderId,
				text: 'gibberish',
				timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
		}
		firebase.pingApp(senderId, u.id, firebaseNode, function(err, node){
			if(err)
				callback(err)
			
			Pushnotifications.sendapp(senderId, u, 'gibberish',function(){
				callback(err, node);
			})	
		})
	})
}

function removeVerifyCode (vc, callback){
	VerifyCode.remove({token : vc.token}, function(err){
		if(err)
			return callback(err)
		return callback(null)
	})
}

function updateUser (vc, callback){
	User.updateToken(vc.phoneNumber, function(err, u){
		if(err)
			return callback(err)

		removeVerifyCode(vc, function(err){
			if(err)
				return callback(err)
			else{
				//var obj = u.toObject();
				//obj['toLoginState'] = true;
				return callback(null, u)
			}
		})
	})
	
}

function contactsToArray(contacts, callback){
	var arr = [];
	function series(obj){
		if(obj){
			arr.push(obj.id);
			series(contacts.shift());
		}else
			return callback(arr);

	}
	series(contacts.shift());
}

function mapContactsToUser(user, contactIds, callback){
	function series(obj){
		if(obj){
			Contact.findByIdAndUpdate(obj,{userId : user.id}, function(err, c){
				series(contactIds.shift());
			})
			
		}else
			return callback(null);
	}
	series(contactIds.shift());
}

function createUser (vc,callback){
	Contact.find({contactValue : vc.phoneNumber, contactType : "number"}, function(err, contacts){
		contactsToArray(contacts, function(contactsArr){
			User.createWithToken(vc.phoneNumber, function(err, user){
				if(err)
					return callback(err)

				mapContactsToUser(user, contactsArr, function(){
					removeVerifyCode(vc, function(err){
						if (err)
							return callback(err)
						else{
							createContactAndAddContactToSupport(user, function(err){
								if(err)
									return callback(err);
								addSupportContactAndMessage(user, function(err){
									if(err)
										return callback(err);
									return callback(err, user);
								})
								
							})
							
						}
					})
				})
				
			})
		});
		
	})
	
}


function checkCode (token, callback){
	VerifyCode.findOne({token : token, verified : true}, function(err, vc){
		if(!vc)
			return callback('invalid')

		User.findOne({phoneNumber : vc.phoneNumber}, function(err, u){
			if(!u)
				return createUser(vc,callback);
			else
				return updateUser(vc,callback);
		})

	})
}

exports.checkCode = checkCode;
exports.createUser = createUser;



exports.post = function(req,res){
	//number = req.body.number;
	code = req.body.verificationCode;
	checkCode(code, function(err, u){
		if(err)
			return res.json({err : err, response : null})
		else
			return res.json({err : null, response : u})
	})
}
