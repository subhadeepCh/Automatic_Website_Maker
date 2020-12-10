var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	One = require("../models/one"),
	Two=require("../models/two"),
	Three=require("../models/three"),
	Four=require("../models/four"),
	Post = require("../models/post"),
	Back = require("../models/background"),
	middleware = require("../middleware");


router.get("/two",(req,res)=>{
	User.find({},(err,user)=>{
		Two.find({},(err,two)=>{
			Post.find({},(err,post)=>{
				Back.find({},(err,back)=>{
					if(err){
					console.log(err);res.redirect("back");
				}
				else{
					res.render("./intermidiate/inter",{back:back,post:post,one:two[0],user:user[0],currentuser:req.user});
				}
				});
			});
		});
	});
	
});
//=============================NEW POST ROUTER=================================

router.get("/:category/new",middleware.isLoggedIn,(req,res)=>{
	User.find({},(err,user)=>{
		if(err){console.log(err);return res.redirect("back");}
		One.find({},(err,one)=>{
		if(err){console.log(err);return res.redirect("back");}
		if(req.params.category===one[0].category){
			res.render("./posts/newpost",{user:user[0],cat:one[0],currentuser:req.user});
		}
			else{
				Two.find({},(err,two)=>{
		if(err){console.log(err);return res.redirect("back");}
		if(req.params.category===two[0].category){
			res.render("./posts/newpost",{user:user[0],cat:two[0],currentuser:req.user});
		}
			else{
				Three.find({},(err,three)=>{
		if(err){console.log(err);return res.redirect("back");}
		if(req.params.category===three[0].category){
			res.render("./posts/newpost",{user:user[0],cat:three[0],currentuser:req.user});
		}
			else{
			
				Four.find({},(err,four)=>{
		if(err){console.log(err);return res.redirect("back");}
		if(req.params.category===four[0].category){
			res.render("./posts/newpost",{user:user[0],cat:four[0],currentuser:req.user});
		}
			else{
				req.flash("error","FEATURE NOT AVAILABLE");
				res.redirect("/");
			}
	});
			
				
			}
	});
			}
	});
			}
	});
	});
});

//================================POST ROUTE============================================
router.post("/newpost",middleware.isLoggedIn,(req,res)=>{
	var post={category:req.body.category,title:req.body.title,subtitle:req.body.subtitle,content:req.body.editor_content,
			  icon:req.body.icon};
	Post.create(post,(err,posts)=>{
		if(err){
			console.log(err);
			return res.redirect("back");
		}
		console.log(posts);
		Post.find({category:req.body.category,display:req.body.display},(err,found)=>{
			if(err){console.log(err);return res.redirect("back");}
			if(found[0]){
				found[0].display=0;
				posts.display=req.body.display;
				found[0].save();
				posts.save();
			}
			else{
			posts.display=req.body.display;
			posts.save();
			}
		});
		req.flash("success","SUCEESSFULLY ADDED");
		res.redirect("/"+posts._id+"/show");
	});
});
//========================SHOW ROUTE=============================================
router.get("/:id/show",(req,res)=>{
	User.find({},(err,user)=>{
		Post.findById(req.params.id,(err,posts)=>{
		res.render("./posts/post",{user:user[0],post:posts,currentuser:req.user});
	});
	});
});
//=================================edit get router=================================
router.get("/:id/edit",middleware.isLoggedIn,(req,res)=>{
	User.find({},(err,user)=>{
		Post.findById(req.params.id,(err,posts)=>{
		res.render("./posts/editpost",{user:user[0],post:posts,currentuser:req.user});
	});
	});
});
//===========================EDIT ROUTE===========================================

	router.put("/:id/edit",middleware.isLoggedIn,(req,res)=>{
	Post.find({category:req.body.category,display:req.body.display},(err,found)=>{
			if(err){console.log(err);return res.redirect("back");}
			if(found[0] && (found[0]._id !=req.params.id)){
				found[0].display=0;
				found[0].save();
			}
		var post={category:req.body.category,title:req.body.title,subtitle:req.body.subtitle,content:req.body.editor_content,
				  display:req.body.display,icon:req.body.icon};
	Post.findByIdAndUpdate(req.params.id,post,(err,editted)=>{
		if(err){
			console.log(err);
			req.flash("error","UNABLE TO DELETE");
			res.redirect("back");
		}
		else{
			console.log(editted);
			req.flash("success","EDITTED "+editted.title+" Successfully");
			res.redirect("/"+editted._id+"/show");
		}
	});
});
});
//===========================DELETE ROUTE=========================================
router.delete("/:id/delete",middleware.isLoggedIn,(req,res)=>{
	Post.findByIdAndRemove(req.params.id,(err,del)=>{
		if(err){
			console.log(err);
			req.flash("error","UNABLE TO DELETE");
			return res.redirect("back");
		}
		req.flash("success","DELETED: "+del.title);
		res.redirect("back");
	});
});
//=====================================================================
module.exports=router;