var express = require('express');
var router = express.Router();
var user = require('./models/userdb');
var company = require('./models/companydb');


/* ----------------------------------------------Functions-----------------------*/
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/


/* Handelling session messages */
/* SET req.session.message */
function setMessage(req, message){
	req.session.message = message;
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

/*  GET USER Permalink from the email          */
function getUserPermalink(email){
	var pos = email.search("@");
	if(pos == -1){
		req.session.message = "Username is not Valid!";
		res.redirect('user_signup');
	}else{
		return email.substring(0,pos).toLowerCase();
	}
}

/*  GET COMPANY Permalink from the email          */
function getCompanyPermalink(name){
	name = name.replace(" ","-");
	return name;
}

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* -----------------------------------------------END ------------------------- */








/* ------------------------------------------Common Paths------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* GET home page. */
var index = function(req, res, next) {
	res.render('index', { title: 'Connectedin', message : getMessage(req)});
};
router.get('/', index);


/* GET Error Page */
router.get('/error', function(req, res, next){
	res.render('error', {message : getMessage(req)});
});


/* User Signup  GET and POST combined! */
router.route('/user_signup')
.get(function(req, res, next){
	res.render('user_signup', { message : getMessage(req) });

})
.post(function( req, res, next){

	user.findOne({username : req.body.email}, function(err, user_found){
		if(err){
			res.send(err);
		}
		else if(user_found != null){
			req.session.message = "Username/Email already in use!";
			res.redirect('user_signup');
		}else{
			var new_user = new user({ 	
				first_name : req.body.firstname,
				last_name : req.body.lastname,
				username : req.body.email,
				password : req.body.password,
				email : req.body.email,
				status : req.body.status,
				permalink : getUserPermalink(req.body.email)
			});
			new_user.save(function (err, new_user){
				if(err){
					console.log(err);
					req.session.message(err);
					res.redirect('/error');
				}else{
					res.redirect('/');
				}
			});		
		}
	});
});


/* Company Signup GET and POST combined */
router.route('/company_signup').get(function(req, res, next){
	res.render('company_signup', {message : getMessage(req)});	
}).post(function(req, res, next){
		company.findOne({name : req.body.companyname}, function(err, company_found){
		if(err){
			res.send(err);
		}
		else if(company_found != null){
			req.session.message = "Company Name already in use!";
			res.redirect('company_signup');
		}else{
			var new_company = new company({ 	
				name : req.body.companyname,
				homepage_url : req.body.homepage_url,
				email_address : req.body.email,
				password : req.body.password,
				description : req.body.description,
				permalink : getCompanyPermalink(req.body.companyname)
			});
			new_company.save(function (err, new_company){
				if(err){
					console.log(err);
					req.session.message(err);
					res.redirect('/error');
				}else{
					res.redirect('/');
				}
			});		
		}
	});
});

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* ---------------------------------END---------------------------------------- */








/* -----------------------------USER CALLS ----------------------------------- */
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/

/* POST user login page. */

var verify_login = function(req,res,next){

	if (req.body.loginType  === 'company') next('route'); //Jumping to next middleware for company

	else next();	
};



var user_login = function(req, res, next){
	//validate in database
	user.findOne({username : req.body.username , password : req.body.password}, function(err,current_user){
		if(err){
			console.log("error in index.js-user_login");
			console.log(err);
			res.send(err);
		}
		else if(current_user == null){
			console.log("from here");
			setMessage(req, "Login Failed");
			res.redirect('/');
		}
		else{			
//			console.log(req.body.username);
			res.redirect('/users/'+ getUserPermalink(req.body.username));
		}
	});
};

router.post('/login', verify_login, user_login);

/* -----------------------------------------------END---------------------------------------------------- */


/* -----------------------------------------COMPANY CALLS------------------------------------------------ */

/* POST company login page. */
router.post('/login' , function(req,res,next){
	company.findOne({permalink : getCompanyPermalink(req.body.username)}, function(err,current_company){
		if(err){
			console.log("error in index.js-company_login");
			console.log(err);
			res.send(err);
		}
		else if(current_company == null){
			setMessage(req, "Login Failed");
			res.redirect('/');
		}
		else{			
//			console.log(req.body.username);
			res.redirect('/company/'+ getCompanyPermalink(req.body.username));
		}
	});
});

/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------*/
/* ---------------------------------- END --------------------------------------- */


module.exports = router;
