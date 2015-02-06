var should = require('should');
var premiumizeController = require('../app/controllers/api/account/premiumizeController');
var User = require('../app/models/user');
var LineNumber = require('../app/models/lineNumber')

describe('premiumizeController test', function(){
	describe('#updateToPremium', function(){
		beforeEach(function(callback){
			User.create({phoneNumber : '12345678907', lineNumber: 'before', premium:false}, function(err, u){
				callback();
			})
		});
		afterEach(function(callback){
			User.remove({phoneNumber : '12345678907'}, function(err){
				LineNumber.remove({phoneNumber: 'after'}, function(err){
					callback();
				})
			})

		});
		it('should update user object with lineNumber', function(callback){
			LineNumber.create({phoneNumber: 'after', available : true}, function(err, u){
				User.findOne({phoneNumber : '12345678907'}, function(err, user){
					user.premium.should.equal(false);
					premiumizeController.updateToPremium(user, function(err, u){
						should.not.exist(err);
						u.lineNumber.should.equal('after');
						u.premium.should.equal(true);
						callback();
					})
				});
			});
			
		})
		it('should return error if no available numbers', function(callback){
			User.findOne({phoneNumber: '12345678907', lineNumber: 'before', premium:false}, function(err, user){
				premiumizeController.updateToPremium(user, function(err, u){
					should.exist(err)
					callback();
				})
			})
		})

	})
})