var should = require('should');
var request = require('supertest');
var express = require('express');
var app = require('../app/app')
var testDB = require('../config/test_database');
var mongoose = require('mongoose')
var User = require('../app/models/user')
var fs = require('fs');
//nvar sms = require('../app/modules/sms')


before(function(callback){
	if(mongoose.connection.db)
		return callback();
	else
		mongoose.connect(testDB.url, callback);
});

after(function(callback){
	mongoose.connection.close(callback)
});

describe('routes integration testing', function(){

	describe('Get /', function(){
		it('should return a 200', function(callback){
		request(app)
			.get('/')
			.expect(200)
			.end(callback)
		})
	});

	describe('Get /:number', function(){
		beforeEach(function(callback){
			User.create({
				emailAddress: 's@example.com',
			    firstName: 'example',
			    middleName: 'awesome',
			    lastName: 'person',
			    phoneNumber       : '12345678901',
			    profileImageURL: 'stub',
			    currentTitle: 'stub',
			    currentLocation: 'stub',
			    bioText: 'stub',
			    experienceTitle1: 'stub',
			    experienceLocation1: 'stub',
			    experienceImageURL1: 'stub',
			    experienceTitle2: 'stub',
			    experienceLocation2: 'stub',
			    experienceImageURL2: 'stub',
			    educationTitle: 'stub',
			    educationLocation: 'stub',
			    educationImageURL: 'stub',
			    lineNumber : 'stub',
			    token : 'stub',
			    linkedInURL : 'stub'
			}, callback);
		});

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 302 with nonexistant number', function(callback){
			request(app)
				.get('/12223334444')
				.expect(302)
				.end(callback)
		});
		it('should return a 200 with existant number', function(callback){
			request(app)
				.get('/12345678901')
				.expect(200)
				.end(callback)
		});
		it('should return 200 with my number', function(callback){
			request(app)
				.get('/16508921463')
				.expect(200)
				.end(function(err, res){
					callback();
				});
		});
		it('should return 200 with kevins number', function(callback){
			request(app)
				.get('/14153956852')
				.expect(302)
				.end(callback);
		});
	})

	describe('POST /api/auth', function(){
		beforeEach(function(callback){
			User.create({number:'13334445555', verification_code: '2345'}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})

		it('should return a 200', function(callback){
			request(app)
				.post('/api/auth')
				.expect(200)
				.end(callback)
		})
		
	});
	describe('POST /api/user', function(callback){
		beforeEach(function(callback){
			User.create({phoneNumber:'14445556666'}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 200', function(callback){
		request(app)
			.post('/api/user')
			.expect(200)
			.end(callback)
		})
		it('should return approiate user', function(callback){
			User.findOne({phoneNumber:'14445556666'}, function(err, u){
				request(app)
					.post('/api/user')
					.send({id: u.id})
					.expect(200)
					.end(function(err, res){
						res.body.response.should.exist;
						res.body.response.phoneNumber.should.equal('14445556666')
						callback();
					})
			})
			
		})

	})
	describe('POST /api/verify', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/verify')
				.expect(200)
				.end(callback)
		})

		
	})
	describe('POST /api/account/sendsms', function(){
		beforeEach(function(callback){
			User.create({lineNumber:'13334445555', token: '1234567890', premium : false}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/sendsms')
				.expect(200)
				.end(callback)
		})
		it('should return a error with no token', function(callback){
			request(app)
				.post('/api/account/sendsms')
				.send({ reciever : '16508921463'})
				.expect(200)
				.end(function(err, res){
					res.body.err.should.equal('no token');
					(res.body.response === null).should.be.true;
					callback();
				});
		})
		it('should return a error with no recieverId', function(callback){
			request(app)
				.post('/api/account/sendsms')
				.send({ access_token : '1234567890'})
				.expect(200)
				.end(function(err, res){
					should.exist(res.body.err);
					res.body.err.should.equal('no recieverId');
					(res.body.response === null).should.be.true;
					callback();
				});
		})

		it('should return a error with no body', function(callback){
			request(app)
				.post('/api/account/sendsms')
				.send({ access_token : '1234567890', recieverId : '16508921463'})
				.expect(200)
				.end(function(err, res){
					res.body.err.should.equal('no body');
					(res.body.response === null).should.be.true;
					callback();
				});
		})

	});

	describe('POST /api/account/sendpackage', function(){
		beforeEach(function(callback){
			User.create({lineNumber:'13334445555', token: '1234567890', premium: false}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/sendpackage')
				.expect(200)
				.end(callback)
		})
		it('should return a error with no token', function(callback){
			request(app)
				.post('/api/account/sendpackage')
				.send({ reciever : '16508921463'})
				.expect(200)
				.end(function(err, res){
					res.body.err.should.equal('no token');
					(res.body.response === null).should.be.true;
					callback();
				});
		})
		it('should return a error with no reciever', function(callback){
			request(app)
				.post('/api/account/sendpackage')
				.send({ access_token : '1234567890'})
				.expect(200)
				.end(function(err, res){
					should.exist(res.body.err);
					res.body.err.should.equal('no reciever');
					(res.body.response === null).should.be.true;
					callback();
				});
		})


	});
	describe('POST /api/account/sendapp', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/sendapp')
				.expect(200)
				.end(callback)
		});


	})
	describe('POST /api/account/updateprofle', function(){
		beforeEach(function(callback){
			User.create({lineNumber:'13334445555', token: '1234567890'}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/updateprofile')
				.expect(200)
				.end(callback)
		});
		it('should update profile', function(callback){
			request(app)
				.post('/api/account/updateprofile')
				.send({access_token: '1234567890', bioText: 'heyheyhey'})
				.expect(200)
				.end(function(err, res){
					should.not.exist(res.body.err);
					should.exist(res.body.response);
					User.findOne({token: '1234567890'}, function(err, u){
						u.bioText.should.equal('heyheyhey');
						callback();
					})
				});
		})
	})
	describe('POST /api/account/addcontactemail', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/addcontactemail')
				.expect(200)
				.end(callback)
		})
	})
	describe('POST /api/account/addcontactnumber', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/addcontactnumber')
				.expect(200)
				.end(callback)
		})
	})

	describe('POST /api/recievesms', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/recievesms')
				.expect(200)
				.end(callback)
		})
	})

	describe('POST /api/account/premiumize', function(){
		beforeEach(function(callback){
			User.create({lineNumber:'13334445555', token: '1234567890'}, callback);
		})

		afterEach(function(callback){
			User.remove({}, callback)
		})
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/premiumize')
				.expect(200)
				.end(callback)
		})
		it('should return a error with no promotionalCode', function(callback){
			request(app)
				.post('/api/account/premiumize')
				.send({access_token : '1234567890'})
				.expect(200)
				.end(function(err, res){
					should.exist(res.body.err);
					res.body.err.should.equal('no promotional code');
					callback();
				})
		})
		it('should return 200 when go through premiumize', function(callback){
			request(app)
				.post('/api/account/premiumize')
				.send({access_token : '1234567890', promotionalCode : 'handshake'})
				.expect(200)
				.end(function(err, res){
					callback();
				})
		})
	});

	describe('POST /api/account/showcontacts', function(){
		it('should return a 200', function(callback){
			request(app)
				.post('/api/account/showcontacts')
				.expect(200)
				.end(function(err,res){
					callback();
				})
		})
	})

});