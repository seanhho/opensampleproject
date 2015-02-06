var mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
	contactValue: String,//relevant number or email
	contactType : {type : String, enum : ['number', 'email']}, //type of contact
    userId : String, //owner of contact
    smsConnectId : String//id stored here is the only id that the sms allows
});

ContactNode = mongoose.model('ContactNode', contactSchema);

module.exports = ContactNode;