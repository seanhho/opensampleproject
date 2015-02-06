var accountSid = 'ACfbd2b171aea84d89d1eb5f9a54e19088'
var authToken = 'a24b138b6f7c6fc3aaba8fcec0f24465'
var RestClient = require('twilio').RestClient;

//TODO maybe take out authentication with each sms
exports.send = function (sender, reciever, body, callback){
	if(!sender)
		return callback('missing sender parameter')
	if(!reciever)
		return callback('missing reciever parameter')
	if(!body)
		return callback('missing body parameter');
	message ={
		to : reciever,
		from : sender,
		body : body
	};
	 var client= new RestClient(accountSid, authToken);
	 client.sendSms(message, function(err, message){
	 	return callback(err, message);
	 })
}