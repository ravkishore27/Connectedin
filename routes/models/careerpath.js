var mongoose = require('./connectdb');
var Schema = mongoose.Schema;

var userCareerRecommendationSchema = new Schema({
	position : String,
	recommendation : []
});

module.exports = mongoose.model('userCareerRecommendation', userCareerRecommendationSchema, 'careerpath');