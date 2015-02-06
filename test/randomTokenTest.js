var RandomToken = require('../app/modules/randomToken');
var should = require('should');
var sinon = require('sinon');
var testDB = require('../config/test_database');
var User = require('../app/models/user')

describe('randomToken module', function(){
	describe('createUniqueToken function', function(){

		beforeEach(function(callback){
			User.create({token: '1111111111111111'}, callback)
		});


		afterEach(function(callback){
			User.remove({},callback);
		})
		it('should create a token', function(callback){
			RandomToken.createUniqueToken(User, function(err, bt){
				should.not.exist(err);
				should.exist(bt);
				callback(err);
			})
		})


		it('should create unique token if token is in the database', function(callback){
			
			var stub = sinon.stub()
				stub.withArgs().onFirstCall().returns('1111111111111111')
				.onSecondCall().returns('1111111111111112');
			prev = RandomToken.createToken
			RandomToken.createToken = stub;
			RandomToken.createUniqueToken(User, function(err, bt){
				RandomToken.createToken.callCount.should.equal(2)
				RandomToken.createToken = prev;// returns stub to previous state
				callback(err);
			})

		})
	})
})
