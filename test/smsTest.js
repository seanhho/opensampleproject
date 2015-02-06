var should = require('should');
var sinon = require('sinon');
var sms = require('../app/modules/sms')
var accountSid = 'ACfbd2b171aea84d89d1eb5f9a54e19088'
var authToken = 'a24b138b6f7c6fc3aaba8fcec0f24465'
var rewire = require('rewire')
//var RestClient = rewire('twilio').RestClient;
var Twilio = rewire('twilio')
describe('sms module', function(){
	describe('#send', function(){
		it('should send sms', function(callback){
			//callback();

			//var stub = sinon.stub(RestClient, "sendSMS", function(sender, reciever, body, callback){
			//	callback(null, {});
			//});
			//stub = sinon.createStubInstance(RestClient)

			///
		// 	sinon.stub()
		// 	sms.send('+14089566839', '16508921463', 'test', function(err, m){
		// 		if(err!==null)
		// 			throw err
		// 		callback();
		// 	})
		callback();
		 })
	})
})