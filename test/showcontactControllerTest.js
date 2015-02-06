var sinon = require('sinon');
var should = require('should');
var showcontactsController = require('../app/controllers/api/account/showcontactsController');
var User = require('../app/models/user')
var Contact = require('../app/models/contact');

describe('showcontactsController', function(){
	describe('showcontacts method', function(){
		beforeEach(function(callback){
			Contact.create({contactValue : "contact@example.com"}, function(err, c){
				Contact.create({contactValue : "contact2@example.com"}, function(err, c2){
					User.create({emailAddress : "sho@example.com", contactList : [c.id,c2.id]}, function(err, u){
						callback(err);
					})
				})
			})
		});
		afterEach(function(callback){
			Contact.remove({}, function(err){
				User.remove({}, function(err){
					callback(err);
				})
			})
		});
		it('should show contacts', function(callback){
			User.findOne({emailAddress : "sho@example.com"}, function(err,u){
				showcontactsController.showContacts(u, function(err2,arr){
					arr.length.should.equal(2);
					Contact.findById(arr[0],function(err,c){
						should.exist(c);
						c.contactValue.should.equal("contact@example.com");
						Contact.findById(arr[1], function(err,c2){
						should.exist(c2);
						c2.contactValue.should.equal("contact2@example.com");
						callback(err);
						})
					})
					
				})
			})
			
		})

	})
	

})