var sms = require('../../../modules/sms')
var firebase = require('../../../modules/firebase')
var dateformat = require('dateformat')
var User = require('../../../models/user')

//make secure
exports.post = function(req,res){
	var reciever = req.body.reciever
	var sender = req.user.lineNumber
	var body = req.body.body
	if(!reciever)
		return res.json({err : "no reciever", response : null})
	if(!sender)
		return res.json({err : "no sender", response :null})
	if(!body)
		return res.json({err : "no body", response : null})

	sms.send(sender, reciever, body, function(err, m){
		var firebaseNode = {
			sender: sender,
			text: body,
			timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
	}
	firebase.pingApp(sender, reciever, firebaseNode, function(err, node){
			if(err)
				return res.json({err : err, reponse : null})
			res.json({err : err, response: node})
		})
		
	})
		
	//})
}
