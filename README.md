# opensampleproject
Backend for IOS application and webview. For mostly read purposes.  
  
  Allows use to sign up with IOS device, and verify their number using sms. 
  
  User then can add other users as contacts with sms or email messaging capabilites.  If the contact already has an account or creates an account, the application switches to in-app messaging.

Installation
-'npm install' to download packages.
-you will need twilio and postmark api keys in the enviromental variables to fully run code.
-apn notifciations are currently disabled in open code
-code is designed to deploy on heroku with mongodb
  
-'node index.js' will run server

Testing
-'npm test' will run tests


Notable files
-app/routes.js
--contains routes to relevant controllers
  
-test/routesTest.js
--contains end to end intergration testing
