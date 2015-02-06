var VerifyCode = require('../../models/verifyCode')
var authNumber = require('../../../config/global').authNumber;
exports.post = function(req,res){
	var sender = req.body.From
	if(sender)
		sender = sender.replace("+", "")
	var reciever = req.body.To
	if(reciever)
		reciever = reciever.replace("+","")
	var text = req.body.Body
	//var text = body.substring(24,body.length);
	
	if(reciever != authNumber)
		return res.end();//res.json({err:'invalid number', response: null})
	VerifyCode.findOne({token : text}, function(err, vc){
		if(!vc)
			return res.end()
		VerifyCode.findByIdAndUpdate(vc.id, {phoneNumber: sender, verified : true}, function(err, vc){
			return res.end();//res.json({err: err, response: null});
		})
	})

}