var mongoose = require('./connectdb');
var Schema = mongoose.Schema;


//var auto_increment = require('mongoose-auto-increment');
//var connection = mongoose.createConnection('mongodb://'+process.env.MONGOLAB_USERNAME+':'+process.env.MONGOLAB_PASSWORD+'@ds031862.mongolab.com:31862/cmpe282project');
//auto_increment.initialize(connection);
//var connection = mongoose.connection;
//auto_increment.initialize(connection);


var userCompanyRecommendationSchema = new Schema({
	user : String,
	compan_rec : []
});

//userCompanyRecommendationSchema.plugin(auto_increment.plugin, 'userCompanyRecommendation');

module.exports = mongoose.model('userCompanyRecommendation', userCompanyRecommendationSchema, 'userCompanyRecommendation');