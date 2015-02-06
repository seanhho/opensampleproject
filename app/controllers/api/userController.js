var User = require('../../models/user')

exports.post = function(req,res){
	User.findOne({_id: req.body.id}, function(err, u){
		res.json({err : err, response: u})
	})
}
