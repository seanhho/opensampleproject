var User = require('../../../models/user');
var LineNumber = require('../../../models/lineNumber');

function updateToPremium (user, callback){
	LineNumber.getNewLineNumber(function(err, ln){
		if(err)
			return callback(err);
		User.findByIdAndUpdate(user.id, {lineNumber : ln.phoneNumber, premium : true}, function(err, u){
			return callback(err, u);
		});
	});
}

exports.updateToPremium = updateToPremium;
 

exports.post = function (req,res){
	var code = req.body.promotionalCode;
	var user = req.user;
	if(!code)
		return res.json({err: 'no promotional code', response: null});

	if(code !== 'handshake')
		return res.json({err : 'invalid', response : null});

	if(user.premium)
		return res.json({err : "already premium", response : null});
	updateToPremium(user, function(err, u){
		if(err)
			return res.json({err : err, response :null});
		return res.json({err : err, response : {lineNumber: u.lineNumber}});
	})
	
}