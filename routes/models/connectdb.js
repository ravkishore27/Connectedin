var mongoose = require('mongoose');


//Connection to mongodb
mongoose.connect('mongodb://'+process.env.MONGOLAB_USERNAME+':'+process.env.MONGOLAB_PASSWORD+'@ds031862.mongolab.com:31862/cmpe282project', function(error){
  if (error) {
    console.log("Unable to connect to database " + error);
  }
  else{
  	console.log("Successfully Connected to Database : Mongolab!!");
  }
});

module.exports = mongoose;
