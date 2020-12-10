var mongoose = require("mongoose");

var backSchema = new mongoose.Schema({
	image:String,
	imageId:String,
	color:String,
	tcolor:String
});

module.exports = mongoose.model("Back",backSchema);