var firebase = require('../../../modules/firebase')
var User = require('../../../models/user')
var dateformat = require('dateformat');
var Pushnotifications = require('../../../modules/pushNotifications');


//make secure
exports.post = function(req,res){
	var recieverId = req.body.recieverId
	var senderId = req.user.id
	var body = req.body.body

	if(!recieverId)
		return res.json({err : 'no reciever param', response: null});
	if(!body)
		return res.json({err : 'no body param', response: null});


	var firebase_node = {
			sender: senderId,
			text: body,
			timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
	}
	firebase.pingApp(senderId, recieverId, firebase_node, function(err, node){
		if(err)
			return res.json({err : err, response: null})
		User.findById(recieverId, function(err, ru){
			Pushnotifications.sendapp(req.user, ru, body,function(){
				return res.json({err: null, response: node})
			})	
		})
		
	})
}
