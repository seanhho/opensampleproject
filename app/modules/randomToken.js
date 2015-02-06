var User = require('../models/user')

//create a random bearer token
exports.createToken = function (){   
    var N = 16;
   	return new Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
}

//create random bearer token, recreates if token exists in user database
exports.createUniqueToken = function (model, callback){
	createToken= this.createToken
	function helper(callback){
		var randomString = createToken();
		model.findOne({token: randomString}, function(err, o){
			if(err){
				callback(err)
			}

			if(o){
				return helper(callback);
		
			}
			else{
				if(callback)
					callback(null, randomString);
			};
				
		})
	}
	helper(callback)
	
}


