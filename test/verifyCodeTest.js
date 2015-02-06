var should = require('should');
var sinon = require('sinon');
var VerifyCode = require('../app/models/verifyCode')
describe('verifycode model', function(){
	describe('#createRandomVerifyCode', function(){
		after(function(callback){
			VerifyCode.remove({}, callback)
		})
		it('should create a code', function(callback){
			VerifyCode.createRandomVerifyCode(function(err, verifycode){
				VerifyCode.find({}, function(err, vc){
					vc.should.not.be.empty;
					callback();
				})
			});
			
		})

	})
})