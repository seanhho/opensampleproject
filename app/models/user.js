//preamble
var mongoose = require('mongoose');
var RandomToken = require('../modules/randomToken')

var nonPreimumLineNumber = require('../../config/global').twowayNumber;

var userSchema = mongoose.Schema({
    emailAddress: String,
    firstName: String,
    middleName: String,
    lastName: String,
    phoneNumber       : String, //their login phone number
    profileImageURL: String,
    //profile info
    currentTitle: String, 
    currentLocation: String,
    bioText: String,
    experienceTitle1: String,
    experienceLocation1: String,
    experienceImageURL1: String,
    experienceTitle2: String,
    experienceLocation2: String,
    experienceImageURL2: String,
    educationTitle: String,
    educationLocation: String,
    educationImageURL: String,
    //useful metadata
    lineNumber : String,
    token : String,
    linkedInURL : String,
    linkedInJSON : mongoose.Schema.Types.Mixed,
    profileComplete : Boolean,
    premium : Boolean,
    emailAddressFlag : Boolean,
    phoneNumberFlag : Boolean,
    linkedInFlag : Boolean,
    apnToken : String,
    lineEmail : String,
    contactList : [String]
});




// create the model for users and expose it to our app
User = mongoose.model('User', userSchema);

User.getData = function(id, callback){
    User.findById(id, function(err, u){
        if(!u)
            return callback("invalid id");
        delete u.apnToken;
        delete u.token;
        delete u.linkedInJSON;
        delete u.emailAddressFlag;
        delete u.phoneNumberFlag;
        delete u.linkedInFlag;
        delete u.contactList;
        return callback(err, u)
    })
}

User.updateToken = function(number, callback){
    RandomToken.createUniqueToken(this, function(err, rt){
        //console.log(number);
        User.findOne({phoneNumber: number}, function(err, u){
            if(err)
                return callback(err)
            if(!u)
                return callback('no user')
            User.findByIdAndUpdate(u.id,{token: rt}, function(err, u){
                if(err)
                    return callback(err)
                if(!u)
                    return callback('no user')
                return callback(err, u)
            })
        })
    })
}



User.createWithToken = function(number, callback){
    //var randomCode = (Math.floor(Math.random() * 9999)).toString();
    RandomToken.createUniqueToken(this, function(err, rt){
        if(err)
            return callback(err)

        var lineEmail = 'replyto+' +number + '@inbound.preamble.im';
        User.create({
            phoneNumber: number,
            token: rt,
            profileComplete : false,
            premium : false,
            lineNumber: nonPreimumLineNumber,
            lineEmail : lineEmail
        }, function(err, u){
            if(err)
              return callback(err)

            if(callback)
              callback(err, u)
        })
    })	
}


module.exports = User;