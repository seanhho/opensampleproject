// var mandrill = require('mandrill-api/mandrill')
// var mandrill_key = process.env.MANDRILL_KEY
// var mandrill_client = new mandrill.Mandrill(mandrill_key);
var postmark = require('postmark')(process.env.POSTMARK_KEY)
var request = require('request')
var domain = "inbound.preamble.im"


exports.send = function(email, callback){
	postmark.send({
		From : email.from,
		To : email.to,
		Subject : email.subject,
		TextBody : email.textbody
	}, function(err, success){
		callback(err, success);
	});

}

exports.recieve = function(body,callback){

}