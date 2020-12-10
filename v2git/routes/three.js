var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	Three = require("../models/three"),
	Post = require("../models/post"),
	Back = require("../models/background"),
	middleware = require("../middleware");


router.get("/three",(req,res)=>{
	User.find({},(err,user)=>{
		Three.find({},(err,three)=>{
			Post.find({},(err,post)=>{
				Back.find({},(err,back)=>{
					if(err){
					console.log(err);res.redirect("back");
				}
				else{
					res.render("./intermidiate/inter",{back:back,post:post,one:three[0],user:user[0],currentuser:req.user});
				}
				});
			});
		});
	});
	
});

//=====================================================================
module.exports=router;