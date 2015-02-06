
//token auth middleware
var ApiAuthenticate = require('./modules/apiAuthenticate');

module.exports=function(app){
	//front page

	//renders front.ejs
	app.route('/')
		.get(function(req,res){
			res.render('index.ejs');
		})
		.post(require('./controllers/rootController').post);



	app.route('/:number')
		.get(require('./controllers/profileController').get);

	//API User data fetch
	//params {id: String}
	app.route('/api/user')
		.post(require('./controllers/api/userController').post);


	//API Login
	//params {verificationCode : String}
	app.route('/api/auth')
		.post(require('./controllers/api/authController').post);

	//Twilio text sms hook
	app.route('/api/recievesms')
		.post(require('./controllers/api/recievesmsController').post);


	//API send Verify code via sms text
	//params {verificationCode : String, phoneNumber : String}
	app.route('/api/verify')
		.post(require('./controllers/api/verifyController').post);

	//Twilio verify hook
	app.route('/api/recieveverify')
		.post(require('./controllers/api/recieveverifyController').post);

	//recieve email webhook
	app.route('/api/recieveemail')
		.post(require('./controllers/api/recieveemailController').post);

	//API send sms message
	//params {sender: string, recieverId: string, body: string}
	app.route('/api/account/sendsms')
		.post(ApiAuthenticate,require('./controllers/api/account/sendsmsController').post);

	//API send sms message
	//params {sender: string, reciever: string, body: string}
	app.route('/api/account/sendpackage')
		.post(ApiAuthenticate,require('./controllers/api/account/sendpackageController').post);

	//API update profile
	//params {access_token : String}
	app.route('/api/account/updateprofile')
		.post(ApiAuthenticate,require('./controllers/api/account/updateprofileController').post)

	//API add contact with email address
	//params {access_token : String, emailAddress : String}
	app.route('/api/account/addcontactemail')
		.post(ApiAuthenticate, require('./controllers/api/account/addcontactemailController').post);

	//API add contact with phone number
	//params {access_token : String, phoneNumber : String}
	app.route('/api/account/addcontactnumber')
		.post(ApiAuthenticate, require('./controllers/api/account/addcontactnumberController').post);

	//API remove contact
	//params {access_token : String, contactId : String}
	app.route('/api/account/removecontact')
		.post(ApiAuthenticate, require('./controllers/api/account/removecontactController').post);

	//API send in-app message
	//params {access_token : String, recieverId : String, body: string}
	app.route('/api/account/sendapp')
		.post(ApiAuthenticate, require('./controllers/api/account/sendappController').post);

	//API make account premium
	//params {access_token : String}
	app.route('/api/account/premiumize')
		.post(ApiAuthenticate, require('./controllers/api/account/premiumizeController').post);

	//API send email
	//params {access_token : String, recieverId : String, textBody : String, subject : String}
	app.route('/api/account/sendemail')
		.post(ApiAuthenticate, require('./controllers/api/account/sendemailController').post)

	//API set route
	//params {access_token : String, pattern : String}
	app.route('/api/account/setroute')
		.post(ApiAuthenticate, require('./controllers/api/account/setrouteController').post)

    //params {access_token : String}
	app.route('/api/account/showcontacts')
		.post(ApiAuthenticate, require('./controllers/api/account/showcontactsController').post)

	//for kevin's use
	app.route('/api/account/kevin')
		.post(ApiAuthenticate, require('./controllers/api/account/kevinController').post);



}