var User = require('../models/user');

module.exports = function(req, res, callback){
	var token = req.body.access_token;
	if(!token)
		return res.json({err: 'no token', response : null});
	User.findOne({token : token}, function(err, u){
		if(err)
			return res.json({err: err, response: null})
		if(!u)
			return res.json({err: 'invalid', response: null})

		req.user= u;
		return callback();
	})

}