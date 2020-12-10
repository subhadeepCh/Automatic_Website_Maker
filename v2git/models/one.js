var mongoose = require("mongoose");

var oneSchema = new mongoose.Schema({
	category : String,
	title    : String,
	desc     : String,
	icon     : String,
	oneText  : String,
	oneBack  : String,
	twoText  : String,
	twoBack  : String,
	threeText  : String,
	threeBack  : String,
});

module.exports = mongoose.model("One",oneSchema);