var sms = require('../../../modules/sms');
var firebase = require('../../../modules/firebase');
var dateformat = require('dateformat');
var User = require('../../../models/user');
var Contact = require('../../../models/contact');

var oneWayNumber = require('../../../../config/global').onewayNumber;

function sendOneWay(user, reciever, body, callback){
	sms.send(oneWayNumber, reciever.contactValue, body, function(err,m){
		if(err)
			return callback(err);

		var firebaseNode = {
			sender: user.id,
			text: body,
			timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
		}
		firebase.pingApp(user.id, reciever.id, firebaseNode, function(err, node){
			return callback(err, node);
		})
	})
}

function sendSmsandUpdateFirebase(id, lineNumber, recieverC, body, callback){
	sms.send(lineNumber, recieverC.contactValue, body, function(err, m){
		if(err)
			return callback(err);

		var firebaseNode = {
			sender: id,
			text: body,
			timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
		}
		firebase.pingApp(id, recieverC.id, firebaseNode, function(err, node){
			return callback(err, node);
		})
	})	
}

function sendToContact(user, cId, body, callback){
	Contact.findById(cId, function(err,c){
		if(!c)
			return callback("contact not found");

		if(c.contactType !== "number")
			return callback("not a number contact");

		if(user.id === c.smsConnectId){
			sendSmsandUpdateFirebase(user.id, user.lineNumber, c, body, function(err, node){
				return callback(err, node);
			})
		}else{
			sendOneWay(user, c, body, function(err,node){
				return callback(err, "one way");
			})
		}
		
	});
}

//make secure
exports.post = function(req,res){
	var reciever = req.body.recieverId;
	var body = req.body.body;
	if(!reciever)
		return res.json({err : "no recieverId", response : null})

	if(!body)
		return res.json({err : "no body", response : null})


	sendToContact(req.user, reciever, body, function(err, node){
		res.json({err : err, response : node});
	})


}
