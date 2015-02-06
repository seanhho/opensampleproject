var PushNotifications = require('../modules/pushNotifications')
var firebase = require('../modules/firebase')
var dateformat = require('dateformat')
var parseString = require('xml2js').parseString
var htmlparser = require("htmlparser2");
var jsdom = require("jsdom");


exports.post = function(req,res){
	var mandrillEventsMsg = JSON.parse(req.body.mandrill_events)[0].msg
	var body = mandrillEventsMsg.html;
	console.log(body)
	// jsdom.env(
	//   body,
	//   ["http://code.jquery.com/jquery.js"],
	//   function (errors, window) {
	//     console.log("div.ltr :", window.$("a.the-link").text());
	//   }
	// );
	// var parser = new htmlparser({
	// 	onopentag : function(name, attributes){

	// 	},
	// 	ontext: function(text){

	// 	},
	// 	onclosetag : function(tagname){

	// 	}
	// }) 	
	// var subject = mandrillEventsMsg.subject;
	// var sender = mandrillEventsMsg.from_email.replace(".", "");
	// var ureciever = mandrillEventsMsg.email;
	// User.findOne({lineEmail : ureciever}, function(err, ureciever){
	// 	var firebaseNode = {
	// 		sender: sender,
	// 		text: parsed_body,
	// 		timestamp: dateformat(Date().now, "UTC:yyyy-mm-dd HH:MM:ss o")
	// 	}
	// 	firebase.pingApp(sender, ureciever.id, firebaseNode, function(err, n){
	// 		PushNotifications.recievedsms(sender,ureciever, parsed_body, function(){
	// 			return res.json({err : err, node : n});
	// 		})
	// 	})
	//});

	
	

}