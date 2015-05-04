var mongoose = require('./connectdb');
var Schema = mongoose.Schema;


var auto_increment = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://'+process.env.MONGOLAB_USERNAME+':'+process.env.MONGOLAB_PASSWORD+'@ds031862.mongolab.com:31862/cmpe282project');
auto_increment.initialize(connection);
var connection = mongoose.connection;
auto_increment.initialize(connection);

var companySchema = new Schema({
  name                : String,
  password            : String,
  homepage_url        : String,
  number_of_employees : Number,
  founded_year        : Number,
  founded_month       : Number,
  founded_day         : Number,
  email_address       : String,
  description         : String,
  overview            : String,
  phone_number        : String,
  products            : [],
  offices             : [{"description": String, "address1": String, 
                                    "address2": String, "zip_code": String, "city": String,
                                    "state_code": String, "country_code": String, "latitude": String,
                                    "longitude": String}],
  locations           : [],
  following_users     : [],
  relationships       : [{"is_past": Boolean, "title": String, "person": {"first_name": String,
                                                                          "last_name": String,
                                                                          "permalink": String
                                                                        }
                         }
                        ],
  permalink           : String
});

companySchema.plugin(auto_increment.plugin, 'company');

module.exports = mongoose.model('company', companySchema, 'companies');