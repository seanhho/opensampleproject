# opensampleproject
<div>Backend for IOS application and webview. For mostly read purposes.</div>
  
<div>Allows use to sign up with IOS device, and verify their number using sms.</div>

<div>User then can add other users as contacts with sms or email messaging capabilites.  If the contact already has an account or creates an account, the application switches to in-app messaging.</div>

Installation
'npm install' to download packages.
You will need twilio and postmark api keys in the enviromental variables to fully run code.
Apn notifciations are currently disabled in open code.
Code is designed to deploy on heroku with mongodb.

'node index.js' will run server

Testing
'npm test' will run tests


Notable files
app/routes.js
//contains routes to relevant controllers
  
test/routesTest.js
//contains end to end intergration testing
