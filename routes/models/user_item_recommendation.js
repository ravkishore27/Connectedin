var mongoose = require('./connectdb');
var Schema = mongoose.Schema;


var userItemRecommendationSchema = new Schema({
	user : String,
	item_rec : []
});

module.exports = mongoose.model('userItemRecommendation', userItemRecommendationSchema, 'userItemRecommendation');

