var sinon = require('sinon');
var should = require('should');
var addcontactController = require('../app/controllers/api/account/addcontactemailController');
var User = require('../app/models/user')
var Contact = require('../app/models/contact');

describe('addcontactemailController', function(){
	describe('addcontact method', function(){
		beforeEach(function(callback){
			User.create({phoneNumber : "16508921463"}, function(err,u){
				return callback(err);
			})
		})
		afterEach(function(callback){
			User.remove({}, function(err){
				Contact.remove({}, function(err){
					return callback(err);
				})
			})
		})
		it('should return an error when given null email', function(callback){
			User.findOne({phoneNumber : "16508921463"}, function(err, user){
				addcontactController.addContact(user.id,null, function(err,c){
					should.exist(err);
					callback();
				})
			});	
		})

		it('should create a contact when adding an email with no respective user and no respective contact', function(callback){
			User.findOne({phoneNumber : "16508921463"}, function(err, user){
				addcontactController.addContact(user, "sho@example.com", function(err, c){
					should.exist(c);
					c.contactValue.should.equal("sho@example.com");
					User.findOne({phoneNumber : "16508921463"}, function(err, u){
						should.exist(u);
						u.contactList.length.should.equal(1);
						Contact.findOne({contactValue : "sho@example.com", contactType : "email"}, function(err, c){
							should.not.exist(err);
							c.id.should.equal(u.contactList[0]);
							c.contactType.should.equal('email');
							callback(err);
						})
						
					})
					
				});
			});
		})

		it('should have contact when adding an email with no respective user but respective contact', function(callback){
			User.findOne({phoneNumber : "16508921463"}, function(err, user){
				Contact.create({contactValue : "sho@example.com", contactType : "email"}, function(err, c){
						addcontactController.addContact(user, "sho@example.com", function(err, c){
							should.exist(c);
							c.contactValue.should.equal("sho@example.com");
							User.findOne({phoneNumber : "16508921463"}, function(err, u){
								should.exist(u);
								u.contactList.length.should.equal(1);
								Contact.findOne({contactValue : "sho@example.com", contactType : "email"}, function(err, c){
									should.not.exist(err);
									c.id.should.equal(u.contactList[0]);
									c.contactType.should.equal('email');
									callback(err);
								})
								
							})
							
						});
				})
			
			});
		})

		it('should create contact when adding an email with a respective user but no respective contact', function(callback){
			User.findOne({phoneNumber : "16508921463"}, function(err, user){
				User.create({emailAddress : "sho@example.com"}, function(err, createdUser){
					addcontactController.addContact(user, "sho@example.com", function(err, c){
						should.exist(user.id);
						should.exist(c);
						c.contactValue.should.equal("sho@example.com");
						c.userId.should.equal(createdUser.id);
						User.findOne({phoneNumber : "16508921463"}, function(err, u){
							should.exist(u);
							u.contactList.length.should.equal(1);
							Contact.findOne({contactValue : "sho@example.com", contactType : "email"}, function(err, c){
									should.not.exist(err);
									c.id.should.equal(u.contactList[0]);
									c.userId.should.equal(createdUser.id);
									c.contactType.should.equal('email');
									User.findOne({emailAddress : "sho@example.com"}, function(err, u){
										Contact.findOne({contactType : "number", contactValue : "16508921463"}, function(err, rc){
											should.exist(u.contactList);
											u.contactList[0].should.equal(rc.id);
											return callback(err);
										})
										
									})
									
							})
							
						})
					});
				})
			})
		});

		it('should have contact when adding an email with respective user and respective contact', function(callback){
			User.findOne({phoneNumber : "16508921463"}, function(err, user){
				User.create({emailAddress : "sho@example.com"}, function(err, userCreated){
					Contact.create({emailAddress : "sho@example.com", userId : userCreated.id, contactType : "email"}, function(err, contactCreated){
						addcontactController.addContact(user, "sho@example.com", function(err, c){
							User.findOne({phoneNumber : "16508921463"}, function(err, u){
								should.exist(u);
								should.exist(u.contactList);
								u.contactList.length.should.equal(1);
								Contact.findOne({contactValue : "sho@example.com", contactType : "email"}, function(err, c){
									should.not.exist(err);
									should.exist(c);
									c.id.should.equal(u.contactList[0]);
									c.userId.should.equal(userCreated.id);
									c.contactType.should.equal('email');
									User.findOne({emailAddress : "sho@example.com"}, function(err, u){
										Contact.findOne({contactType : "number", contactValue : "16508921463"}, function(err, rc){
											should.exist(u.contactList);
											u.contactList[0].should.equal(rc.id);
											return callback(err);
										})
									})
								})
							})
							
						})
					})

				})
			})
		})



	})
})