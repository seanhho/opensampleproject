// /account/signup
var VerifyText = require('../../../models/verifytext')
var User = require('../../../models/user')
//var BearerToken = require('../../../modules/bearerToken')
// //create a random bearer token
// createToken = function (){   
//     var N = 16;
//    	return new Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);
// }

// //create random bearer token, recreates if token exists in user database
// createUniqueToken = function (callback){
// 	var randomString = createToken();
// 	User.findOne({bearer_token: randomString}, function(err, u){
// 		if(err){
// 			callback(err)
// 		}

// 		if(u){
// 			return create_unique_token(callback);
	
// 		}
// 		else{
// 			callback(null, randomString);
// 		};
			
// 	})
	
// }

//creates user with a unique bearer token and given phone number
// createUserWithUniqueToken = function(number, callback){
// 	BearerToken.createUniqueToken(function(err, randomString){
// 		User.createByBearerToken(number, randomString, function(err, u){
// 			if(err)
// 				callback(err)
// 			else
// 				callback(null, u);
// 		});
// 	});

// }

// //POST function
// exports.post = function(req,res){
// 	number = req.body.number;
// 	code = req.body.code;
// 	if(!number)
// 		return res.json({err: "no number parameter", response: null})

// 	if(!code)
// 		return res.json({err: "no code parameter", response: null})

// 	VerifyText.findVText(number, function(err, vt){
// 		if (vt && (vt.code === code)){
// 			createUserWithUniqueToken(number, function(err, u){
// 				return res.json({err: err, response: u})
// 			})
// 		}else
// 			return res.json({err: "invalid code", response: null})
// 	})
// }