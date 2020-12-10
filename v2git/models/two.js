var mongoose = require("mongoose");

var twoSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Two",twoSchema);