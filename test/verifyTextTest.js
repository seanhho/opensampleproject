var should = require('should');
var testDB = require('../config/test_database');
var mongoose = require('mongoose')
var VerifyText = require('../app/models/verifytext')

before(function(callback){
	if(mongoose.connection.db)
		return callback();
	else
		mongoose.connect(testDB.url, callback);
});

after(function(callback){
	mongoose.connection.close(callback)
});



describe('verifyText model', function(){



	beforeEach(function(callback){
		VerifyText.create({number:'12223334444', code: '1342'},function(err){
		 	callback(err);
		});

		
	})
	afterEach(function(callback){
		VerifyText.remove({},callback)
		
	})

	describe('#create()', function(){
		it('should create new verifyText', function(callback){
			VerifyText.create({code:'1111'}, function(err, vt){
				should.not.exist(err);
				//vt.number.should.equal('12345678901');
				vt.code.should.equal('1111');
				callback();

			})
		})
	})


})
