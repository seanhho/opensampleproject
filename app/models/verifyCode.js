var mongoose = require('mongoose');
var RandomToken = require('../modules/randomToken')

//verify code for login
verifyCodeSchema = mongoose.Schema({
	token : String,
	verified : Boolean,
	phoneNumber : String
})

verifycode = mongoose.model('VerifyCode', verifyCodeSchema)

verifycode.createRandomVerifyCode = function (callback){
	RandomToken.createUniqueToken(this, function(err, rt){
		verifycode.create({token: rt, verified : false}, function(err, vc){
			if(callback)
				callback(err, vc);
			
		})
	})

}

module.exports = verifycode