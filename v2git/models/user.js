var passportLocalMongoose=require("passport-local-mongoose"),
	mongoose             =require("mongoose");


var userSchema = new mongoose.Schema({
	username : String,
	name    : String,
	password : String,
	secret   : String,
	image    : String,
	imageId  : String,
	twitter  : String,
	facebook : String,
	github   : String,
	linkedin : String,
	insta    : String,
	tagline  : String,
	desc     : String,
	oneliner : String,
	phone    : String,
	email    : String
});


userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);