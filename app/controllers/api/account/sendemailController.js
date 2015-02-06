var email = require('../../../modules/email');
var firebase = require('../../../modules/firebase');
var Contact = require('../../../models/contact')
var dateformat = require('dateformat');

function sendEmail(senderId, recieverId, emailmsg, signature, callback){
	var originalmessage = emailmsg.textbody;
	emailmsg.textbody = emailmsg.textbody + signature;
	email.send(emailmsg, function(err, success){
		emailmsg.textbody = originalmessage;
		if(err)
			return callback(err);
		else{
			var firebaseNode = {
				sender: senderId,
				text: emailmsg.textbody,
				timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
			};

			firebase.pingApp(senderId, recieverId, firebaseNode, function(err, node){
				return callback(err,node);
			});
		}
	});

}

function contactToEmail (senderId, recieverId, emailmsg, signature, callback){
	if(!senderId)
		return callback('null senderId');
	Contact.findById(recieverId, function(err,c){
		if(!c)
			return callback('contact not found');
		if(c.contactType !== "email")
			return callback('contact not email');
		else{
			emailmsg.to = c.contactValue;
			sendEmail(senderId, recieverId, emailmsg, signature, function(err, n){
				return callback(err, n);
			})
		}
	})
}


exports.post = function(req,res){
	var from = "replyto+" + req.user.phoneNumber + "@inbound.preamble.im";
	var senderId = req.user.id;
	var recieverId = req.body.recieverId;
	var subject = req.body.subject;

	if(req.user.lastName)
		var name = req.user.firstName + " " + req.user.lastName;
	else
		var name = req.user.firstName;

	


	var textbody = req.body.textbody;
	if(req.body.signature)
		var signature = req.body.signature
	else
		var signature = "";

	var emailmsg = {
		from : name + " <" + from + ">",
		subject : subject,
		textbody : textbody
	};

	contactToEmail(senderId, recieverId, emailmsg, signature, function(err, firebaseNode){
		return res.json({err : err, response : firebaseNode});
	});


}