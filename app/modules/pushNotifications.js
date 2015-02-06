var apn = require('apn');

//notifcation when recieving in app message

//notifications commented out in open version
exports.sendapp = function (sender,reciever, body, callback){
	// var apnConnection = new apn.Connection({cert : 'config/dev_cert.pem', key : 'config/dev_key.pem'})
	// var note = new apn.Notification();

	// var message = sender.firstName + " " + sender.lastName + ":\n" + body;
	// if (body.length > 50) {
	// 	message = sender.firstName + " " + sender.lastName + ":\n" + body.substring(0,47) + "...";
	// }

	// note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// note.badge = 1;
	// note.sound = "ping.aiff";
	// note.alert = message;
	// note.payload = {'id': sender.id, type : 'message'};
	// apnConnection.pushNotification(note, reciever.apnToken);
	callback();
}

//when recieving sms
exports.recievedsms = function (sender,reciever, body, callback){
	// var apnConnection = new apn.Connection({cert : 'config/dev_cert.pem', key : 'config/dev_key.pem'})
	// var note = new apn.Notification();

	// var message = sender.contactValue + ":\n" + body;
	// if (body.length > 50) {
	// 	message = sender.contactValue + ":\n" + body.substring(0,47) + "...";
	// }

	// note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// note.badge = 1;
	// note.sound = "ping.aiff";
	// note.alert = message;
	// note.payload = {'id': sender.id, type : 'message'};
	// apnConnection.pushNotification(note, reciever.apnToken);
	callback();
}


//when recieving email
exports.recievedemail = function (sender,reciever, body, callback){
	// var apnConnection = new apn.Connection({cert : 'config/dev_cert.pem', key : 'config/dev_key.pem'})
	// var note = new apn.Notification();

	// var message = sender.contactValue + ":\n" + body;
	// if (body.length > 50) {
	// 	message = sender.contactValue + ":\n" + body.substring(0,47) + "...";
	// }

	// note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// note.badge = 1;
	// note.sound = "ping.aiff";
	// note.alert = message;
	// note.payload = {'id': sender.id, type : 'message'};
	// apnConnection.pushNotification(note, reciever.apnToken);
	callback();
}

//when someone adds user as contact
exports.addedAsContact = function (senderContact ,sender, reciever, callback){
	// var apnConnection = new apn.Connection({cert : 'config/dev_cert.pem', key : 'config/dev_key.pem'})
	// var note = new apn.Notification();
	// note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	// note.badge = 1;
	// note.sound = "ping.aiff";
	// note.alert = sender.firstName + " " + sender.lastName + " has added you!";
	// note.payload = {'id': sender.id, 'contactId': senderContact.id,  type : 'addcontact'};
	// apnConnection.pushNotification(note, reciever.apnToken);
	callback();
}