var mongoose = require('./connectdb');
var Schema = mongoose.Schema;

// var auto_increment = require('mongoose-auto-increment');
// var connection = mongoose.createConnection('mongodb://'+process.env.MONGOLAB_USERNAME+':'+process.env.MONGOLAB_PASSWORD+'@ds031862.mongolab.com:31862/cmpe282project');
// auto_increment.initialize(connection);
// var connection = mongoose.connection;
// auto_increment.initialize(connection);

var userSchema = new Schema({
  first_name          : String,
  last_name           : String,
  username            : String,
  password            : String,
  email               : String,
  blog_urls           : [],
  skills              : [],
  overview            : String,
  degrees             : [{"degree_type": String, "subject": String, "institution": String,
                          "graduated_year":Number, "graduated_month": Number, "graduated_day": Number}],
  certificates        : [],
  locations            : [ {name : String, from : Date,
                                        to : Date }],
  status              : String,
  companies_following : [],
  //users he follows:
  users_following     : [],
  //users following the cureent user:
  following_users     : [],
  jobs_applied        : [],
  relationships       : [{"is_past": Boolean, "title": String, "firm": {"name": String,
                                                                          "permalink": String,
                                                                           "type_of_entity": String
                                                                        }
                         }
                        ],
  permalink           : String
});


//--------------------------------------------------------------------------
userSchema.methods.editStatus = function (new_status){
  this.status = new_status;
};
//--------------------------------------------------------------------------
userSchema.methods.editOverview = function (new_overview){
  this.overview = new_overview;
};
//--------------------------------------------------------------------------
userSchema.methods.editFirstname = function (new_firstname){
  this.firstname = new_firstname;
};
//--------------------------------------------------------------------------
userSchema.methods.editLastname = function (new_lastname){
  this.lastname = new_lastname;
};
//--------------------------------------------------------------------------
userSchema.methods.addBlog = function (add_blog){
  this.blog_urls.push(add_blog);
};

userSchema.methods.editBlog = function (new_url, index){
  this.blog_urls.splice(index,1);
  this.blog_urls.splice(index, 0 , new_url);
};

userSchema.methods.deleteBlog = function (new_url, index){
  this.blog_urls.splice(index,1);
};

//--------------------------------------------------------------------------
userSchema.methods.addSkills = function (new_skill){
  this.skills.push(new_skill);
};


userSchema.methods.editSkills = function (new_skill, index){
  this.skills.splice(index,1);
  this.skills.splice(index,0,new_skill);
};

userSchema.methods.deleteSkills = function (new_skill, index){
  this.skills.splice(index,1);
};
//--------------------------------------------------------------------------
userSchema.methods.addDegree = function(add_degreeType, add_subject,add_institution, add_graduatedYear, add_graduatedMonth, add_graduatedDay){

  var new_degree = {
    degree_type : add_degreeType,
    subject : add_subject,
    institution : add_institution,
    graduated_year : add_graduatedYear,
    graduated_month : add_graduatedMonth,
    graduated_day : add_graduatedDay
  };
  this.degrees.push(new_degree);
};

userSchema.methods.editDegree= function(add_degreeType, add_subject,add_institution, add_graduatedYear, add_graduatedMonth, add_graduatedDay,index){
   var new_degree = {
    degree_type : add_degreeType,
    subject : add_subject,
    institution : add_institution,
    graduated_year : add_graduatedYear,
    graduated_month : add_graduatedMonth,
    graduated_day : add_graduatedDay
  };
  
  this.degrees.splice(index,1);
  this.degrees.splice(index,0,new_degree);
};

userSchema.methods.deleteDegree = function (index){
  this.degrees.splice(index,1);
};
//--------------------------------------------------------------------------

userSchema.methods.addLocation = function(add_location_name, add_location_from, add_location_to, present){

  var location = {
    name : add_location_name,
    from : add_location_from
  };

  if(present == false){
      location.to = add_location_to;
      if(this.locations.length == 0){
        this.locations.push(location);
      }else{
        for(var x = 0; x < this.locations.length; x++){
          if(this.locations[x].from.getTime() > new Date(add_location_from).getTime()){
            this.locations.splice(x,0,location);
            break;
          }
        }
      }
  }else{
     this.locations.push(location);
  }
};

userSchema.methods.editLocation = function(edit_location_name, edit_location_from , edit_location_to, index){
  this.locations.splice(index,1);
  this.addLocation(edit_location_name, edit_location_from , edit_location_to, false);
};

userSchema.methods.deleteLocation = function (index){
  this.locations.splice(index,1);
};
//--------------------------------------------------------------------------

userSchema.methods.addCertificate = function (new_certificate){
  this.certificates.push(new_certificate);
};


userSchema.methods.editCertificate = function (new_certificate, index){
  this.certificates.splice(index,1);
  this.certificates.splice(index,0, new_certificate);
};

userSchema.methods.deleteCertificate = function (new_certificate, index){
  this.certificates.splice(index,1);
};
//--------------------------------------------------------------------------

userSchema.methods.removeUsers_following = function (follow_user){
  var index = this.users_following.indexOf(follow_user.permalink);
  if(index != -1){
    this.users_following.splice(index,1);
  }
  index = follow_user.following_users.indexOf(this.permalink);
  if(index != -1){
    follow_user.following_users.splice(index,1);
    follow_user.save(function (err, saved_user){
      if(err){
        console.log(err);
        req.session.message(err);
        res.redirect('/error');
      }
  });
  }
};

userSchema.methods.addUsers_following = function (follow_user){
  this.users_following.push(follow_user.permalink);
  follow_user.following_users.push(this.permalink); 
  console.log(follow_user);
  follow_user.save(function (err, saved_user){
      if(err){
        console.log(err);
      }
  }); 
};
//--------------------------------------------------------------------------

userSchema.methods.removeCompanies_following = function (company_following){
  var index = this.companies_following.indexOf(company_following.permalink);
  if(index != -1){
    this.companies_following.splice(index,1);
  }
  index = company_following.following_users.indexOf(this.permalink);
  if(index != -1){
    company_following.following_users.splice(index,1);
    company_following.save(function (err, saved_company){
      if(err){
        console.log(err);
        req.session.message(err);
        res.redirect('/error');
      }
  });
  }
};

userSchema.methods.addCompanies_following = function (company_following){
  console.log(company_following);
  this.companies_following.push(company_following.permalink);
  company_following.following_users.push(this.permalink); 
  company_following.save(function (err, saved_company){
      if(err){
        console.log(err);
        req.session.message(err);
        res.redirect('/error');
      }
  }); 
};


//--------------------------------------------------------------------------

userSchema.methods.removeJobs_applied = function (remove_job){

  var index = this.jobs_applied.indexOf(remove_job.job_id);
  if(index != -1){
    this.jobs_applied.splice(index,1);
  }
  index = remove_job.users_applied.indexOf(this.permalink);
  if(index != -1){
    remove_job.users_applied.splice(index,1);
    remove_job.save(function (err, saved_job){
      if(err){
        console.log(err);
        req.session.message(err);
        res.redirect('/error');
      }
    });
  }
};

userSchema.methods.addJobs_applied = function (applied_job){
  //console.log(company_following);
  var index = this.jobs_applied.indexOf(applied_job.job_id);
  if(index == -1){
    this.jobs_applied.push(applied_job.job_id);
  }
  index = applied_job.users_applied.indexOf(this.permalink);
  if(index == -1){
    applied_job.users_applied.push(this.permalink); 
    applied_job.save(function (err, saved_job){
        if(err){
          console.log(err);
          req.session.message;
          res.redirect('/error');
        };
    });   
  }
  
};



//--------------------------------------------------------------------------
//userSchema.plugin(auto_increment.plugin, 'user');

module.exports = mongoose.model('user',userSchema, 'usersjson');