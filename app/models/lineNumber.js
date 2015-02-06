var mongoose = require('mongoose');


var lineNumberSchema = mongoose.Schema({
	phoneNumber : String,
	available : Boolean,
	promoCode : String,
	userId : String
})

function phoneNumberValidator(val, callback){
	LineNumber.findOne({phoneNumber: val}, function(err, ln){
		if(ln)
			return callback(false)
		else
			return callback(true)
	})
};





lineNumberSchema.path('phoneNumber').validate(phoneNumberValidator, 'phoneNumber is already added');

LineNumber = mongoose.model('lineNumber', lineNumberSchema);

LineNumber.getNewLineNumber = function(callback){
	LineNumber.findOneAndUpdate({available : true}, {available : false}, function(err, l){
		if(err)
		{
			return callback(err);
		}else if(!l){
			return callback('no available numbers')
		}
		return callback(err, l);
	});
};





module.exports = LineNumber;
