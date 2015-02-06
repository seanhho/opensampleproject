var Firebase = require('firebase');
var myRootRef = new Firebase('https://preamble.firebaseIO.com/');

exports.pingApp = function (from, to, node, callback){
	myRootRef.child(from).child(to).push(node, function(err)//ping firebase
	{
		if(err)
			return callback(err)
		else{
			myRootRef.child(to).child(from).push(node, function(err){
				if(err)
					return callback(err)
				else
					return callback(null, node)
			});
		}
	});
}	