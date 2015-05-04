var mongoose = require('./connectdb');
var Schema = mongoose.Schema;


var auto_increment = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://'+process.env.MONGOLAB_USERNAME+':'+process.env.MONGOLAB_PASSWORD+'@ds031862.mongolab.com:31862/cmpe282project');
auto_increment.initialize(connection);
var connection = mongoose.connection;
auto_increment.initialize(connection);

var jobSchema = new Schema({
  title               : String,
  description         : String,
  skills        	  : [],
  expiry_date		  : Date,
  company_name		  : String,
  recruiter_name      : String,
  office              : [{"description": String, "address1": String, 
                                    "address2": String, "zip_code": String, "city": String,
                                    "state_code": String, "country_code": String, "latitude": String,
                                    "longitude": String}],
  locations   			  : [],
  users_applied 		  : [],
  company_permalink   : String,
  job_id              : Number
});


jobSchema.plugin(auto_increment.plugin, 'job');

module.exports = mongoose.model('job', jobSchema, 'jobs');