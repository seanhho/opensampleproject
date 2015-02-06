var User = require('../../../models/user')


function updateUser (id, updateJson,callback){
	updateJson.profileComplete = true;
	User.findByIdAndUpdate(id, updateJson, function(err, u){
		callback(err,u)
	})
}

exports.updateUser = updateUser;

exports.post = function (req,res){
	id = req.user.id
	updateUser(id, req.body, function(err, u){
		if(err)
			return res.json({err: err, response: null})
		if(!u)
			return res.json({err: 'invalid', response: null})
		return res.json({err: err, response: u})
	});
}

	