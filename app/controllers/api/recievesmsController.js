var firebase = require('../../modules/firebase')
var dateformat = require('dateformat')
var User = require('../../models/user')
var Contact = require('../../models/contact')
var PushNotifications = require('../../modules/pushNotifications')

exports.post = function(req,res){
	//console.log(req.body.From + " " + req.body.To + " " + req.body.Body)
	var sender = req.body.From
	if(sender)
		sender = sender.replace("+", "")
	var reciever = req.body.To
	if(reciever)
		reciever = reciever.replace("+","")

	if(!sender || !reciever)
		return res.end(); //res.json({err : "missing param", reponse: null})
	var body = req.body.Body


	Contact.findOne({contactType: "number", contactValue : sender}, function(err, senderc){
		var firebaseNode = {
		sender: senderc.id,
		text: body,
		timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
		}
		firebase.pingApp(senderc.id, senderc.smsConnectId, firebaseNode, function(err, n){
			User.findById(senderc.smsConnectId, function(err, ureciever){
				PushNotifications.recievedsms(senderc ,ureciever, body, function(){
					return res.end(); 
				})
			})
		})
	})

		

}