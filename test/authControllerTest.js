var should = require('should');
var sinon = require('sinon');
var AuthController = require('../app/controllers/api/authController')
var VerifyCode = require('../app/models/verifyCode')
var User = require('../app/models/user');
var Contact = require('../app/models/contact');
//var RandomToken = require('../app/modules/randomToken');

describe('auth Controller', function(){
	describe('#checkCode', function(){
		beforeEach(function(callback){
			VerifyCode.create({phoneNumber: '14567890234', token : '123456789098765', verified : true}, callback);
		});
		afterEach(function(callback){
			VerifyCode.remove({}, function(err, vc){
				User.remove({}, callback);
			});	
		})
		it('should create user when user with token is not there', function(callback){
			AuthController.checkCode('123456789098765', function(err, u){
				should.not.exist(err);
				should.exists(u);
				u.phoneNumber.should.equal('14567890234');
				VerifyCode.findOne({token : '123456789098765'}, function(err, vc){
					should.not.exist(vc);
					callback();
				})
				
			})
		})


		it('should update user when user with token is there', function(callback){
			User.create({phoneNumber: '14567890234', token: '123456789098765', bioText : 'stubstubstub'}, function(err, user){
				AuthController.checkCode('123456789098765', function(err, u){
					should.not.exist(err);
					u.phoneNumber.should.equal('14567890234');
					u.bioText.should.equal('stubstubstub');
					VerifyCode.findOne({token : '123456789098765'}, function(err, vc){
						should.not.exist(vc);
						callback();
					})
					
				});
			})
			
		});
	})
	describe('#createUser', function(){
		afterEach(function(callback){
			VerifyCode.remove({}, function(err){
				User.remove({}, function(err){
					Contact.remove({}, callback)

				});
			});	
		})
		it('should point respective contact to newUser', function(callback){
			Contact.create({contactValue : "13334445555", contactType : "number"}, function(err, createdContact){
				VerifyCode.create({phoneNumber: "13334445555", token : '123456789098765', verified : true}, function(err, vc){
					AuthController.createUser(vc, function(err,u){
						u.phoneNumber.should.equal("13334445555");
						
						Contact.findById(createdContact.id, function(err,c){
							should.exist(c.userId);
							c.userId.should.equal(u.id);
							callback(err);
						})
						
					})
				})	
			})
		})
	})

})