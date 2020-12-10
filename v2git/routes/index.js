var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	One = require("../models/one"),
	Two = require("../models/two"),
	Three = require("../models/three"),
	Four = require("../models/four"),
	Post = require("../models/post"),
	Back= require("../models/background"),
	middleware = require("../middleware");
//==================================================================


//==================AUTHENTICATIONS==========================================
router.get("/",(req,res)=>{
	
	User.find({},(err,userr)=>{
		if(err){
console.log(err);res.redirect("back");}
		else{
		Back.find({},(err,back)=>{
			if(err){
console.log(err);res.redirect("back");}
		else{
			Post.find({},(err,post)=>{
				if(err){
					console.log(err);res.redirect("back");
				}
				else{
					One.find({},(err,one)=>{
			Two.find({},(err,two)=>{
			Three.find({},(err,three)=>{
				Four.find({},(err,four)=>{
				if(err){console.log(err);return res.redirect("back");}
				else{
					res.render("index",{post:post,one:one[0],two:two[0],three:three[0],four:four[0],back:back,userr:userr,currentuser:req.user});
				}
			});
			});
			});		 
			});
				}
			});
		}
		});
		}
	});	
});
router.get("/login",(req,res)=>{
	User.find({},(err,user)=>{
		if(err){
			console.log(err);
			return res.redirect("back");
		}
		else{
			res.render("./authenticate/login",{user:user[0],currentuser:req.user});
		}
	});
});

//============================================================

//==========================================================
module.exports=router;