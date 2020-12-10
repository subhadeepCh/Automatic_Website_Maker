var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
	category :String,
	title    :String,
	icon     :String,
	image    :String,
	imageId  :String,
	content  :String,
	subtitle :String,
	youtube  :String,
	link     :String,
	linkname :String,
	display  :String
});


module.exports = mongoose.model("Post",postSchema);