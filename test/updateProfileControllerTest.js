var should = require('should');
var updateProfileController = require('../app/controllers/api/account/updateProfileController')
var User = require('../app/models/user')
describe('updateProfile Controller', function(){
	describe('#updateUser', function(){
		beforeEach(function(callback){
			User.createWithToken('13214324321', callback);
		});
		afterEach(function(callback){
			User.remove({}, callback);
		});
		it('should update User', function(callback){
			User.findOne({phoneNumber: '13214324321'}, function(err, u){
				should.exist(u);
				updateProfileController.updateUser(u.id, {bioText : 'stubstub'}, function(err,u){
					should.not.exist(err);
					u.phoneNumber.should.equal( '13214324321');
					u.bioText.should.equal('stubstub');
					u.profileComplete.should.be.true;
					(u.firstName===undefined).should.be.true;
					callback();
				})
			})
			
		})
	})
})