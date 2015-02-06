var sms = require('../../modules/sms')
var User = require('../../models/user')
var VerifyCode = require('../../models/verifyCode')
var authNumber = require('../../../config/global').authNumber;
exports.post = function(req,res){
	VerifyCode.createRandomVerifyCode(function(err, vc){
		return res.json({err : err, response : {phoneNumber : authNumber, verificationCode : vc.token}})
	});
}