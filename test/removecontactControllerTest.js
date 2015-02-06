var should = require('should');
var removecontactController = require('../app/controllers/api/account/removecontactController');
var Contact = require('../app/models/contact');
var User = require('../app/models/user');

describe('remove contact controller', function(){
	describe('#removeContact method', function(){
		beforeEach(function(callback){
			Contact.create({contactValue : "s@e.com", contactType : "email"}, function(err, c){
				User.create({phoneNumber : "16508921463", contactList : [c.id]}, function(err, u){
					callback();
				});
			});
		});
		afterEach(function(callback){
			Contact.remove({}, function(err){
				User.remove({}, callback);
			});
		});
		it('should remove contact', function(callback){
			Contact.findOne({contactValue : "s@e.com"}, function(err, originalC){
				should.not.exist(err);
				should.exist(originalC);
				User.findOne({phoneNumber : "16508921463"}, function(err, originalU){
					removecontactController.removeContact(originalU, originalC.id, function(err, c){
					should.not.exist(err);
					User.findOne({phoneNumber : "16508921463"}, function(err, u){
						should.not.exist(err);
						u.contactList.should.be.empty;
						callback();
					});
				})
				})
				
			})
			
		});
	})
})