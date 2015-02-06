var mongoose = require('mongoose');

var verifyTextSchema = mongoose.Schema({

	//number: String,
	code: String

});



// create the model for users and expose it to our app
VerifyText = mongoose.model('VerifyText', verifyTextSchema);



module.exports = VerifyText;