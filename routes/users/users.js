var express = require('express');
var router = express.Router();
var user = require('../models/userdb');
var company = require('../models/companydb');
var jobs = require('../models/jobsdb');





/* ----------------------------------------------Functions----------------------------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET User Object */
function getUser(req, res, next){
	user.findOne({ "permalink" : req.params.permalink }, function(err, current_user){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(current_user != null){
			req.session.user = current_user;
		}else{
			//console.log("users.js-getUser");
			req.session.message = "user returned is null";
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

/* GET req.session.user */
function getSessionUser(req){
	var current_user = null;
	if(req.session.user){
		current_user = req.session.user;
		req.session.user = null;
	}
	//console.log(current_user);
	return current_user;
}

/* find user for req.query.permalink */
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

/* find company for req.query.permalink */
function findCompany(req, res, next){
	company.findOne({permalink : req.query.permalink}, function(err,current_company){
		if(err){
			console.log("error in users.js-company_search");
			console.log(err);
			res.send(err);
		}
		else if(current_company == null){
			req.session.search_company = "undefined";
		}
		else{
			req.session.search_company = req.query.permalink;
			
		}
		next();
	});
}

/* GET req.session.search_company */
function getSearchCompany(req){
	var search_company = null;
	if(req.session.search_company){
		search_company = req.session.search_company;
		req.session.search_company = null;
	}
	return search_company;
}

/* GET Look Company Object */
function get_look_company(req, res, next){
	//console.log(req.params.look_company_permalink);
	company.findOne({ "permalink" : req.params.look_company_permalink }, function(err, current_company){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(current_company != null){
			console.log(current_company);
			req.session.look_company = current_company;
		}else{
			console.log("users.js-get_look_company");
			req.session.message = "user returned is null";
		}
		next();
	});
};

/* GET req.session.look_company */
function getSessionLookCompany(req){
	var current_company = null;
	if(req.session.look_company){
		current_company = req.session.look_company;
		req.session.look_company = null;
	}
	//console.log(look_company);
	return current_company;
};


/* find jobs for req.query.job_title */
function findJobs(req, res, next){
	jobs.find({title : req.query.job_title}, function(err,current_jobs){
		if(err){
			console.log("error in users.js-job_search");
			console.log(err);
			res.send(err);
		}
		else if(current_jobs == null){
			req.session.search_user = "undefined";
		}
		else{
			req.session.search_jobs = current_jobs;
		}
		next();
	});
};

/* GET req.session.search_user */
function getSearchJobs(req){
	var search_jobs = null;
	if(req.session.search_jobs){
		search_jobs = req.session.search_jobs;
		req.session.search_jobs = null;
	}
	return search_jobs;
};

/* GET Look Job Object */
function get_look_job(req, res, next){
	//console.log(req.params.look_job_id);
	jobs.findOne({ "job_id" : req.params.look_job_id }, function(err, current_job){
		if(err){
			console.log(err);
			req.session.message = "Look on console ";
		}else if(current_job != null){
			req.session.look_job = current_job;
		}else{
			req.session.message = "user returned is null";
		}
		next();
	});
};

/* GET req.session.look_job */
function getSessionLookJob(req){
	var current_job = null;
	if(req.session.look_job){
		current_job = req.session.look_job;
		req.session.look_job = null;
	}
	//console.log(look_company);
	return current_job;
};

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* -----------------------------------------------END-------------------------- */



















/* ------------------------------- USER CALLS- -------------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET users Default call!!! */
router.get('/', function(req, res, next) {
	res.send("You should not be here!!! Admin purpose only!!");
});
/*------------------------------------------------------------------------------*/

/* GET user_home Page. */
var user_home = function(req, res, next) {

	if(req.session.message){
	 	res.redirect('/error');
	}else{

		res.status(200).render('user_home', { user : getSessionUser(req)});
	}
};
router.get('/:permalink', getUser, user_home);
/*------------------------------------------------------------------------------*/

/* GET user_users Page. */
var user_users = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('user_users', { user : getSessionUser(req) });
	}
};
router.get('/:permalink/users', getUser, user_users);


/*------------------------------------------------------------------------------*/

/* GET companies Page. */
var user_company = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('user_company', { user : getSessionUser(req)});
	}
};
router.get('/:permalink/companies', getUser, user_company);
/*------------------------------------------------------------------------------*/


/* GET Jobs Page. */
var user_jobs = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('user_jobs', { user : getSessionUser(req)});
	}
};
router.get('/:permalink/jobs', getUser, user_jobs);
/*------------------------------------------------------------------------------*/



/* GET edit_profile Page. */
var edit_profile = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		res.status(200).render('user_edit_profile', { user : getSessionUser(req)});
	}
};
router.get('/:permalink/edit_profile', getUser, edit_profile);
/*------------------------------------------------------------------------------*/
/* GET Logout */
router.get('/:permalink/logout', function(req, res, next) {
	req.session.message = 'Successfully Logged out!';
	res.redirect('/');
});
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* --------------------------------USER CALLS ENDS - --------------------------- */




















/*----------------------USER - USERS PAGE CALLS --------------------------------*/
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/*------------------- Search User Functionality------------------- */
var search_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		console.log(req.session.search_user);
		res.status(200).render('user_users', { user : getSessionUser(req), search_user : getSearchUser(req) });
	}
};
router.get("/:permalink/users/user_search/", findUser, getUser, search_user);



/*------------------- Search User Functionality See User------------------- */
var look_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		console.log(req.session.search_user);
		res.status(200).render('look_user', { user : getSessionUser(req), look_user : getSessionLookUser(req) });
	}
};
router.get("/:permalink/users/:look_user_permalink/", get_look_user, getUser, look_user);

/*------------------- Follow User Functionality ------------------- */
var follow_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_user = req.session.look_user;
		current_user.addUsers_following(current_look_user);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/' + current_user.permalink+'/users/'+current_look_user.permalink+'/');
			}
		});
	}
};
router.get("/:permalink/users/:look_user_permalink/follow", get_look_user, getUser, follow_user);


/*------------------- Unfollow User Functionality ------------------- */
var unfollow_user = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_user = req.session.look_user;
		current_user.removeUsers_following(current_look_user);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/'+current_user.permalink+'/users/'+current_look_user.permalink+'/');
			}
		});
	}
};
router.get("/:permalink/users/:look_user_permalink/unfollow", get_look_user, getUser, unfollow_user);



/*------------------- Search User END Functionality see User ------------------- */

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/*---------------------USER - USERS PAGE CALLS END------------------------------*/



















/*-------------------------USER - COMPANY PAGE CALLS ----------------------------*/
/*------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/

/*------------------- Search Company Functionality------------------- */
var search_company = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		console.log(req.session.search_company);
		res.status(200).render('user_company', { user : getSessionUser(req), search_company : getSearchCompany(req) });
	}
};
router.get("/:permalink/companies/company_search/", findCompany, getUser, search_company);


/*------------------- Search User Functionality See Company------------------- */
var look_company = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.look_company);
		res.status(200).render('look_company', { user : getSessionUser(req), look_company : getSessionLookCompany(req) });
	}
};
router.get("/:permalink/companies/:look_company_permalink/", get_look_company, getUser, look_company);

/*------------------- Follow Company Functionality ------------------- */
var follow_company = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_comany = req.session.look_company;
		//console.log(current_look_comany);
		current_user.addCompanies_following(current_look_comany);
		console.log(current_user);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/' + current_user.permalink+'/companies/'+current_look_comany.permalink+'/');
			}
		});
	}
};
router.get("/:permalink/companies/:look_company_permalink/follow", get_look_company, getUser, follow_company);


/*------------------- Unfollow Company Functionality ------------------- */
var unfollow_company = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_comany = req.session.look_company;
		current_user.removeCompanies_following(current_look_comany);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/'+current_user.permalink+'/companies/'+current_look_comany.permalink+'/');
			}
		});
	}
};
router.get("/:permalink/companies/:look_company_permalink/unfollow", get_look_company, getUser, unfollow_company);



/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/*---------------------USER - USERS COMPANY CALLS END------------------------------*/














/*-------------------------USER - JOBS PAGE CALLS ----------------------------*/
/*------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------*/


/*------------------- Search User Functionality------------------- */
var search_jobs = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.search_jobs);
		res.status(200).render('user_jobs', { user : getSessionUser(req), search_jobs : getSearchJobs(req) });
	}
};
router.get("/:permalink/jobs/job_search/", findJobs, getUser, search_jobs);



/*------------------- Search User Functionality See Job------------------- */
var look_job = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		//console.log(req.session.look_company);
		res.status(200).render('look_job', { user : getSessionUser(req), job : getSessionLookJob(req)});
	}
};
router.get("/:permalink/jobs/:look_job_id/", get_look_job, getUser, look_job);



/*------------------- Apply Jobs Functionality ------------------- */

var apply_job = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_job = req.session.look_job;

		//console.log(current_user);
		//console.log(current_look_job);
		//console.log(current_company);
		current_user.addJobs_applied(current_look_job);
		//console.log(current_user);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/' + current_user.permalink+'/jobs/'+current_look_job.job_id+'/');
			}
		});
	};
};
router.get("/:permalink/jobs/:look_job_id/apply", get_look_job, getUser, apply_job);


/*------------------- Withdraw Jobs Functionality ------------------- */

var withdraw_job = function(req, res, next) {
	//console.log(req.session.message);
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = req.session.user;
		var current_look_job = req.session.look_job;

		//console.log(current_user);
		//console.log(current_look_job);
		//console.log(current_company);
		current_user.removeJobs_applied(current_look_job);
		//console.log(current_user);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message;
				res.redirect('/error');
			}else{
				res.status(200).redirect('/users/' + current_user.permalink+'/jobs/'+current_look_job.job_id+'/');
			}
		});
	};
};
router.get("/:permalink/jobs/:look_job_id/withdraw", get_look_job, getUser, withdraw_job);


/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/*---------------------USER - USERS JOBS CALLS END------------------------------*/





















/*----------------------------EDIT PROFILE PAGE CALLS-------------------------*/
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET edit_profile/edit_status Page. */
var edit_profile_status = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.editStatus(req.query.status_edit);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_status', getUser, edit_profile_status);
/*------------------------------------------------------------------------------*/


/* GET edit_profile/edit_summary Page. */
var edit_profile_summary = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.editSummary(req.query.summary_edit);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_summary', getUser, edit_profile_summary);
/*------------------------------------------------------------------------------*/


/* GET edit_profile/edit_firstname Page. */
var edit_profile_firstname = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.editFirstname(req.query.firstname_edit);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_firstname', getUser, edit_profile_firstname);
/*------------------------------------------------------------------------------*/


/* GET edit_profile/edit_lastname Page. */
var edit_profile_lastname = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.editLastname(req.query.lastname_edit);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_lastname', getUser, edit_profile_lastname);
/*------------------------------------------------------------------------------*/

/* GET edit_profile/add_blog . */
var edit_profile_add_blog = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.addBlog(req.query.add_blog_url);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/add_blog', getUser, edit_profile_add_blog);


/* GET edit_profile/edit_delete_blog . */
var edit_profile_edit_delete_blog = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		if(req.query.blog=='delete'){
			current_user.deleteBlog(req.query.edit_blog_url,req.query.index);
		}else{
			current_user.editBlog(req.query.edit_blog_url,req.query.index);
		}
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_delete_blog', getUser, edit_profile_edit_delete_blog);
/*------------------------------------------------------------------------------*/

/* GET edit_profile/add_skills . */
var edit_profile_add_skills = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.addSkills(req.query.add_skill);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/add_skills', getUser, edit_profile_add_skills);


/* GET edit_profile/edit_delete_skills . */
var edit_profile_edit_delete_skill = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		if(req.query.skill == 'delete'){
			current_user.deleteSkills(req.query.edit_skill,req.query.index);
		}else{
			current_user.editSkills(req.query.edit_skill, req.query.index);
		}
		console.log(current_user.skills);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_delete_skill', getUser, edit_profile_edit_delete_skill);
/*------------------------------------------------------------------------------*/


/* GET edit_profile/add_degree. */
var edit_profile_add_degree = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.addDegree(req.query.add_degreeType,
									req.query.add_subject,
									req.query.add_institution,
									req.query.add_graduatedYear,
									req.query.add_graduatedMonth,
									req.query.add_graduatedDay);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/add_degree', getUser, edit_profile_add_degree);


/* GET edit_profile/edit_delete_degree . */
var edit_profile_edit_delete_degree = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		if(req.query.degree == 'delete'){
			current_user.deleteDegree(req.query.index);
		}else{
			current_user.editDegree(req.query.edit_degree_degreeType,
									req.query.edit_degree_subject,
									req.query.edit_degree_institution,
									req.query.edit_degree_graduatedYear,
									req.query.edit_degree_graduatedMonth,
									req.query.edit_degree_graduatedDay,										
										req.query.index);
		}
		//console.log(current_user.skills);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_delete_degree', getUser, edit_profile_edit_delete_degree);
/*------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------*/
/* GET edit_profile/add_location . */
var edit_profile_add_location = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.addLocation(req.query.add_location_name, req.query.add_location_from,
									req.query.add_location_to, req.query.present || false);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/add_location', getUser, edit_profile_add_location);


/* GET edit_profile/edit_delete_location . */
var edit_profile_edit_delete_location = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		if(req.query.location == 'delete'){
			current_user.deleteLocation(req.query.index);
		}else{
			current_user.editLocation(req.query.edit_location_name,
										req.query.edit_location_from,
										req.query.edit_location_to,										
										req.query.index);
		}
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_delete_location', getUser, edit_profile_edit_delete_location);
/*------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------*/

/* GET edit_profile/add_certificate. */
var edit_profile_add_certificate = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		current_user.addCertificate(req.query.add_certificate);
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/add_certificate', getUser, edit_profile_add_certificate);


/* GET edit_profile/edit_delete_certificate. */
var edit_profile_edit_delete_certificate = function(req, res, next) {
	if(req.session.message){
	 	res.redirect('/error');
	}else{
		var current_user = getSessionUser(req);
		if(req.query.certificate == 'delete'){
			current_user.deleteCertificate(req.query.edit_certificate,req.query.index);
		}else{
			current_user.editCertificate(req.query.edit_certificate, req.query.index);
		}
		current_user.save(function (err, saved_user){
			if(err){
				console.log(err);
				req.session.message = err;
				res.redirect('/error');
			}else{
				res.status(201).redirect('/users/'+ saved_user.permalink +'/edit_profile');
			}
		});
	}
};
router.get('/:permalink/edit_profile/edit_delete_certificate', getUser, edit_profile_edit_delete_certificate);

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/*-----------------------------EDIT PROFILE PAGE CALLS -------------------------*/


/*------------------------------------------------------------------------------*/
/* -----------------------------------------------END---------------------------------------------------- */

module.exports = router;