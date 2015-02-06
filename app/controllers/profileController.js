var User = require('../models/user')

exports.get = function(req,res){
	User.findOne({phoneNumber: req.params.number}, function(err, u){
		if(err || !u)
			return res.redirect('/');
		var ua = req.header('user-agent');
	    if(/mobile/i.test(ua)) {
	        res.render('profile.ejs', {
				user_image: u.profileImageURL,
				name_text : u.firstName + " " + u.middleName + " " + u.lastName,
				current_job_text: u.currentTitle,
				current_location_text: u.currentLocation,
				bio_text: u.bioText,
				job_image1: u.experienceImageURL1,
		    	job_image2: u.experienceImageURL2,
		    	school_image: u.educationImageURL,
		    	job_text1: u.experienceTitle1,
		    	job_text2: u.experienceTitle2,
		    	location_text1: u.experienceLocation1,
		    	location_text2: u.experienceLocation2,
		    	degree_text: u.educationTitle,
		    	school_text: u.educationLocation,
		    	email: u.emailAddress,
		    	linkedin: u.linkedInURL,
		    	phoneNumber : u.phoneNumber
			});
	    } else {
	        res.render('profile_web.ejs', {
				user_image: u.profileImageURL,
				name_text : u.firstName + " " + u.middleName + " " + u.lastName,
				current_job_text: u.currentTitle,
				current_location_text: u.currentLocation,
				bio_text: u.bioText,
				job_image1: u.experienceImageURL1,
		    	job_image2: u.experienceImageURL2,
		    	school_image: u.educationImageURL,
		    	job_text1: u.experienceTitle1,
		    	job_text2: u.experienceTitle2,
		    	location_text1: u.experienceLocation1,
		    	location_text2: u.experienceLocation2,
		    	degree_text: u.educationTitle,
		    	school_text: u.educationLocation,
		    	email: u.emailAddress,
		    	linkedin: u.linkedInURL,
		    	phoneNumber : u.phoneNumber
			});
	    }	
	});
	
}


