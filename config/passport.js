// config/passport.js
// load up the user model
var User            = require('../app/models/user');
var BearerStrategy = require('passport-http-bearer').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // passport.use('bearer', new BearerStrategy({ "passReqToCallback": true },
    //     function(req, token, done) {
    //         // asynchronous validation, for effect...
    //         process.nextTick(function () {
          
    //           // Find the user by token.  If there is no user with the given token, set
    //           // the user to `false` to indicate failure.  Otherwise, return the
    //           // authenticated `user`.  Note that in a production-ready application, one
    //           // would want to validate the token for authenticity.
    //           User.findOne({bearer_token: token}, function(err, user){
    //             if (err) { return done(err); }
    //             if (!user) { 
    //                 return done(null, false); 
    //             }
    //             return done(null, user);
    //           });
    //         });
    // }));

};
