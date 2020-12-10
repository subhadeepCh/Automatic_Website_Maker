var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	Four 	= require("../models/four"),
	Post = require("../models/post"),
	Back = require("../models/background"),
	middleware = require("../middleware");


router.get("/four",(req,res)=>{
	User.find({},(err,user)=>{
		Four.find({},(err,four)=>{
			Post.find({},(err,post)=>{
				Back.find({},(err,back)=>{
					if(err){
					console.log(err);res.redirect("back");
				}
				else{
					res.render("./intermidiate/inter",{back:back,post:post,one:four[0],user:user[0],currentuser:req.user});
				}
				});
			});
		});
	});
	
});

//=====================================================================
module.exports=router;