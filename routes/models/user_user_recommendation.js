var mongoose = require('./connectdb');
var Schema = mongoose.Schema;


var userUserRecommendationSchema = new Schema({
	user : String,
	recommendation : []
});

module.exports = mongoose.model('userUserRecommendation', userUserRecommendationSchema, 'userUserRecommendation');