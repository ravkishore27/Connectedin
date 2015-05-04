var express = require('express');
var router = express.Router();
var company = require('../models/companydb');
var jobs  = require('../models/jobsdb');
var user = require('../models/userdb');

/* ----------------------------------------------Functions----------------------------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET User Object */
function getCompany(req, res, next){
	company.findOne({ "permalink" : req.params.permalink }, function(err, current_company){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(current_company != null){
			console.log(current_company);
			req.session.company = current_company;
		}else{
			req.session.message = "company returned is null";
		}
		next();
	});
};

function getJobs(req, res, next){
	jobs.find({ "company_permalink" : req.params.permalink }, function(err, company_jobs){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(company_jobs != null){
			var company_all_jobs = [];
			company_jobs.forEach(function(job){
				company_all_jobs.push(job);
			});
			req.session.company_jobs = company_all_jobs;
		}else{
			req.session.message = "company returned is null";
		}
		next();
	});
};

/* GET req.session.message */
function getMessage(req){
	var message = null;
	if(req.session.message){
		message = req.session.message;
		req.session.message = null;
	}
	return message;
}

/* GET req.session.company */
function getSessionCompany(req){
	var current_company = null;
	if(req.session.company){
		current_company = req.session.company;
		req.session.company = null;
	}
	return current_company;
}

/* GET req.session.company */
function getSessionJobs(req){
	var company_jobs = null;
	if(req.session.company_jobs){
		company_jobs = req.session.company_jobs;
		req.session.company_jobs = null;
	}
	return company_jobs;
}

/* find user for req.params.permalink */
function findUser(req, res, next){
	user.findOne({permalink : req.query.permalink}, function(err,current_user){
		if(err){
			console.log("error in users.js-user_search");
			console.log(err);
			res.send(err);
		}
		else if(current_user == null){
			req.session.search_user = "undefined";
		}
		else{
			req.session.search_user = req.query.permalink;
			
		}
		next();
	});
}

/* GET req.session.search_user */
function getSearchUser(req){
	var search_user = null;
	if(req.session.search_user){
		search_user = req.session.search_user;
		req.session.search_user = null;
	}
	return search_user;
}

/* GET Look User Object */
function get_look_user(req, res, next){
	user.findOne({ "permalink" : req.params.look_user_permalink }, function(err, current_user){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(current_user != null){
			req.session.look_user = current_user;
		}else{
			req.session.message = "user returned is null";
		}
		next();
	});
};

/* GET req.session.look_user */
function getSessionLookUser(req){
	var current_user = null;
	if(req.session.look_user){
		current_user = req.session.look_user;
		req.session.look_user = null;
	}
	//console.log(current_user);
	return current_user;
}



/* GET Jobs Count */
function getJobsCount(req, res, next){
	jobs.count({},function(err, count){
		//console.log(count);
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(count != 0){
			req.session.count = count;
		}else{
			req.session.count = 1;
		}
		next();
	});
};

/* GET req.session.look_user */
function getSessionJobsCount(req){
	var current_job_count = null;
	if(req.session.count){
		current_job_count = req.session.count;
		req.session.count = null;
	}
	//console.log(current_job_count);
	return current_job_count;
}


/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* ------------------------------Functions END------------------------------------- */


/* ------------------------------- USER CALLS- -------------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET users Default call!!! */
router.get('/', function(req, res, next) {
  res.send("You should not be here!!! Admin purpose only!!");
});
/*------------------------------------------------------------------------------*/

/* GET company_home Page. */
var company_home = function(req, res, next) {

	if(req.session.message){
	 	res.redirect('/error');
	}else{

		res.status(200).render('company_home', { company : getSessionCompany(req)});
	}
};
router.get('/:permalink', getCompany, company_home);


/*------------------------------------------------------------------------------*/

/* GET edit_profile Page. */
var edit_profile = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('company_edit_profile', { company : getSessionCompany(req)});
	}
};
router.get('/:permalink/edit_profile', getCompany, edit_profile);

/*------------------------------------------------------------------------------*/
/* GET companies Page. */
var company_companies = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('company_companies', { company : getSessionCompany(req)});
	}
};
router.get('/:permalink/companies', getCompany, company_companies);


/*------------------------------------------------------------------------------*/
/* GET company_user Page. */
var company_users = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('company_users', { company : getSessionCompany(req)});
	}
};
router.get('/:permalink/users', getCompany, company_users);
/*------------------------------------------------------------------------------*/
/* GET Logout */
router.get('/:permalink/logout', function(req, res, next) {
	req.session.message = 'Successfully Logged out!';
	res.redirect('/');
});

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* --------------------------------USER CALLS ENDS - --------------------------- */


/*----------------------COMPANY - USERS PAGE CALLS --------------------------------*/
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/*------------------- Search User Functionality------------------- */
var search_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log("here" +req.session.search_user);
		res.status(200).render('company_users', { company : getSessionCompany(req), search_user : getSearchUser(req) });
	}
};
router.get('/:permalink/users/user_search/', findUser, getCompany, search_user);


/*------------------- Search User Functionality See User------------------- */
var look_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.look_user);
		res.status(200).render('look_user', { company : getSessionCompany(req), look_user : getSessionLookUser(req) });
	}
};
router.get("/:permalink/users/:look_user_permalink/", get_look_user, getCompany, look_user);

/*----------------------COMPANY - USERS PAGE CALLS END ----------------------------*/
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/


/* --------------------------------JOBS  - --------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* GET jobs Page. */
var company_jobs = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.company_jobs);
		res.status(200).render('company_jobs', { company : getSessionCompany(req), jobs : getSessionJobs(req)});
	}
};
router.get('/:permalink/jobs', getCompany, getJobs, company_jobs);



var add_job = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var new_skills = [];
		var new_locations = [];
		var incoming_skills = req.query.add_skills.split(",");
		var incoming_locations = req.query.add_location	.split(",");
		for(var i = 0; i < incoming_skills.length; i++){
			new_skills.push(incoming_skills[i].trim());
		};
		for(var i = 0; i < incoming_locations.length; i++){
			new_locations.push(incoming_locations[i].trim());
		};


		var new_job = new jobs({
								title 				: req.query.add_title,
  								description         : req.query.add_description,
  								skills        	    : new_skills,
  								expiry_date		    : req.query.add_expiry_date,
  								company_name		: req.query.add_companyname,
  								recruiter_name      : req.query.add_recruiter_name,
  								locations			: new_locations,
  								company_permalink   : req.params.permalink,
  								job_id				: getSessionJobsCount(req)
		});
		//console.log(new_job);

		new_job.save(function (err, saved_job){
			if(err){
				console.log(err);
				req.session.message;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/company/'+ getSessionCompany(req).permalink+'/jobs');
			}
		});
	}
};
router.get('/:permalink/jobs/add_job', getCompany, getJobsCount, add_job);


/* Show jobs Page. */
var show_jobs = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.company_jobs[req.params.index]);
		res.status(200).render('look_job', { company : getSessionCompany(req), job : getSessionJobs(req)[req.params.index]});
	}
};
router.get('/:permalink/jobs/:index', getCompany, getJobs, show_jobs);

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* --------------------------------JOBS  ENDS - --------------------------- */



module.exports = router;
