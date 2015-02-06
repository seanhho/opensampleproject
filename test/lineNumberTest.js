var LineNumber = require('../app/models/lineNumber')
var should = require('should');

describe('LineNumber model', function(){
	describe('phoneNumber validation test', function(){
		beforeEach(function(callback){
			LineNumber.create({phoneNumber : '12345678901', available: true}, callback)
		});
		afterEach(function(callback){
			LineNumber.remove({phoneNumber : '12345678901'}, callback);
		})
		it('should give error if not unique', function(callback){
			LineNumber.create({phoneNumber : '12345678901', available: true}, function(err, ln){
				should.exist(err);
				err.errors.phoneNumber.message.should.equal('phoneNumber is already added')
				callback();
			});
		})
	})
	describe('#getNewLineNUmber', function(){
		beforeEach(function(callback){
			LineNumber.create({phoneNumber : '12345678902', available: true}, callback)
		});
		afterEach(function(callback){
			LineNumber.remove({phoneNumber : '12345678902'}, callback);
		})
		it('should get new lineNumber', function(callback){
			LineNumber.getNewLineNumber(function(err, ln){
				should.not.exist(err);
				should.exist(ln);
				ln.phoneNumber.should.equal('12345678902');
				ln.available.should.be.false;
				callback();
			})
		})
	})
})