var firebase = require('../../modules/firebase')
var User = require('../../models/user');
var Contact = require('../../models/contact');
var dateformat = require('dateformat');
var PushNotifications = require('../../modules/pushNotifications');



exports.post = function(req,res){
	//console.log(req.body);
	var sender = req.body.FromFull.Email;
	var hash = req.body.MailboxHash;
	var reciever = req.body.OriginalRecipient;
	var text = req.body.StrippedTextReply;
	User.findOne({phoneNumber : hash}, function(err,u){
		Contact.findOne({ contactValue : sender, contactType: "email"}, function(err, c){
			var firebase_node = {
				sender: c.id,
				text: text,
				timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
			}
			firebase.pingApp(c.id, u.id, firebase_node, function(err, node){
				if(err)
					return res.end();
				PushNotifications.recievedemail(c, u, text, function(){
					return res.end();
				})
			})
		})
		
	})
}