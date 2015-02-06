var email = require('../../../modules/email')

exports.post = function(req,res){
	var pattern = req.body.pattern;
	if(!pattern)
		return res.json({err : 'no pattern'})
	var url = "http://preamble.herokuapp.com"//req.user.number + "@inbound.preamble.im"
	email.setRoute(url, pattern, function(err, result){
		res.json({err : err, result : result})
	})
}