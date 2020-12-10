var express = require("express"),
	router     = express(),
	passport=require("passport"),
	User    =require("../models/user"),
	One = require("../models/one"),
	Two = require("../models/two"),
	Three = require("../models/three"),
	Four = require("../models/four"),
	multer = require('multer'),
	middleware = require("../middleware");
//===========================================

var storage= multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'subhadeep', 
  api_key: '969674691525866', 
  api_secret: 'WBGpbFS1RAF6A-gJaAqjlb7_UrU'
});

//===============AUTH SIGNUP ROUTE=============
router.post("/register",upload.single('image'),(req,res)=>{
	cloudinary.uploader.upload(req.file.path, function(result) {
		req.body.image = result.secure_url;
		req.body.imageId=result.public_id;
		if(req.body.secret==="subhadeep")
		   {
		   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
			{
				cloudinary.v2.uploader.destroy(result.public_id, function(err1) {
				if(err1){
						console.log("ERROR IN DELETING THE DP "+err);
						}
				else{
					console.log("Uploaded image deleted "+req.body.imageId);
					console.log(err);
					req.flash("error",err.message);
					return res.redirect("back");
				}});
			
			}
		else
			{
				user.image= result.secure_url;
				user.imageId=result.public_id;
				user.name=req.body.name;
				user.twitter=req.body.twitter;
				user.facebook=req.body.facebook;
				user.github=req.body.github;
				user.linkedin=req.body.linkedin;
				user.insta=req.body.insta;
				user.tagline=req.body.tagline;
				user.desc=req.body.desc;
				user.oneliner=req.body.oneliner;
				user.secret=req.body.secret;
				
				user.email=req.body.email;
				user.save();
				passport.authenticate("local")(req,res,function(){
					console.log("Registered Successfully !! "+ user.username);
					req.flash("success","Registered Successfully !! 	Welcome "+user.username);
					//=========creating the category of different pages**********************************************
	var one={category:"Blog",title:"Read all Posts.",desc: "I write all about Technolgy in Computer Engineering field and create interesting projects.",icon: "#000000",oneText: "#ffffff",oneBack: "#24ab79",twoText  : "#000000",twoBack : "#fcede3",threeText : "#ffffff",threeBack : "#cee1ed"}
	One.create(one,(err,item)=>{
		if(err){console.log(err);}
	});
	var two={category:"Projects",title:"Highlighted Projects",desc: "View all the amazing Projects",icon: "#000000",oneText: "#000000",oneBack: "#ffd8bd",twoText  : "#ffffff",twoBack : "#215250",threeText : "#ffffff",threeBack : "#000000"}
	Two.create(two,(err,item)=>{
		if(err){console.log(err);}
	});
	var three={category:"Experience",title:"Procured Internships/Training",desc: "View my work or Learn how to get these oppurtunities",icon: "#ffffff",oneText: "#ffffff",oneBack: "#ab4538;",twoText  : "#ffffff",twoBack : "#215250",threeText : "#ffffff",threeBack : "#000000"}
	Three.create(three,(err,item)=>{
		if(err){console.log(err);}
	});
	var four={category:"Education",title:"Procured Internships/Training",desc: "View my work or Learn how to get these oppurtunities",icon: "#ffffff",oneText: "#ffffff",oneBack: "#ab4538;",twoText  : "#ffffff",twoBack : "#215250",threeText : "#ffffff",threeBack : "#000000"}
	Four.create(four,(err,item)=>{
		if(err){console.log(err);}
	});
	res.redirect("/user");
				});
			}
	});
		   
		   }
		 else{
		   cloudinary.v2.uploader.destroy(result.public_id, function(err1) {
				if(err1){
						console.log("ERROR IN DELETING THE DP "+err);
						}
			   else{
				   req.flash("error","INVALID REGISTRATION");
				   console.log("INVALID REGISTRATION");
			   }
			   res.redirect("back");
				});
		   }
	});
	
});
//=====================================
//===========LOGIN ROUTE===================
router.post("/login",passport.authenticate("local",{
	failureRedirect: "/",
	failureFlash: 'Invalid username or password.'
}),(req,res)=>{
	console.log("Logged In Successfully !!")
	req.flash("success","Logged In Successfully !!");
		res.redirect("/");	
});
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged Out Successfully !!");
	res.redirect("/");
});
//===============FORM.ejs====================================
router.get("/user",middleware.isLoggedIn,(req,res)=>{
	User.find({},(err,user)=>{
		if(err){
console.log(err);}
		else{
		res.render("./authenticate/form",{user:user,currentuser:req.user});}
	});
});

//===================PUT ROUTER================================

router.put("/register",upload.single('image'),(req,res)=>{
	User.find({},(err3,user)=>{
		if(req.file){
		cloudinary.v2.uploader.destroy(user[0].imageId, function(err1) {
			if(err1){
				console.log("ERROR IN PUT ROUTE "+err);
				req.flash("error",err.message);
				res.redirect("back");
			}
			else{
				console.log("One Image Deleted during Update");
				cloudinary.v2.uploader.upload(req.file.path, function(err,result) {
					if(err){
						console.log("ERROR IN PUT ROUTES "+err);
				req.flash("error",err.message);
				res.redirect("back");
					}
					else{
						user[0].imageId=result.public_id;
						user[0].image=result.secure_url;
						user[0].name=req.body.name;
						user[0].twitter=req.body.twitter;
						user[0].facebook=req.body.facebook;
						user[0].github=req.body.github;
						user[0].linkedin=req.body.linkedin;
						user[0].insta=req.body.insta;
						user[0].tagline=req.body.tagline;
						user[0].desc=req.body.desc;
						user[0].oneliner=req.body.oneliner;
						
						user[0].email=req.body.email;
						user[0].save();
						req.flash("success","SUCCESSFULLY UPDATED WITH IMAGE");
						res.redirect("/editback");
					}
				});
			}
		});
	}
	else{
		user[0].name=req.body.name;
		user[0].twitter=req.body.twitter;
		user[0].facebook=req.body.facebook;
		user[0].github=req.body.github;
		user[0].linkedin=req.body.linkedin;
		user[0].insta=req.body.insta;
		user[0].tagline=req.body.tagline;
		user[0].desc=req.body.desc;
		user[0].oneliner=req.body.oneliner;
		
		user[0].email=req.body.email;
		user[0].save();
		req.flash("success","SUCCESSFULLY UPDATED");
		res.redirect("/editback");
	}
	});
});
//===========================================
module.exports=router;