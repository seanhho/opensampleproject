var User = require('../app/models/user')
var should = require('should');
var testDB = require('../config/test_database');
var mongoose = require('mongoose')


describe('user model', function(){
	

	describe('#createWithToken', function(){
		beforeEach(function(callback){
		callback();
		})
		afterEach(function(callback){
			User.remove({phoneNumber : '23456789012'},callback);
		})
		it('should create user', function(){
			User.createWithToken('23456789012', function(err, u){
				u.token.should.exist;
				u.profileComplete.should.be.false;
				//u.token.should.equal('0123456789123456')
				u.phoneNumber.should.equal('23456789012')
			})
		})
	})

	describe('#updateToken', function(){
		beforeEach(function(callback){
		User.create({phoneNumber: '33456789012', token: '1234567890123465'}, callback)
		})
		afterEach(function(callback){
			User.remove({phoneNumber: '33456789012'}, callback);

		})
		it('should change token', function(callback){
			User.updateToken('33456789012', function(err, u){
				User.findOne({phoneNumber: '33456789012'}, function(err, u){
					(u===undefined).should.be.false;
					u.phoneNumber.should.equal('33456789012');
					u.token.should.not.equal('1234567890123465');
					callback();
				})
				
			})
		})
	})
})
