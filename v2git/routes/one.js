var express = require("express"),
	router     = express(),
	User   = require("../models/user"),
	One = require("../models/one"),
	Two=require("../models/two"),
	Three=require("../models/three"),
	Four=require("../models/four"),
	Post = require("../models/post"),
	Back = require("../models/background"),
	middleware = require("../middleware"),
	multer = require('multer');
router.get("/one",(req,res)=>{
	User.find({},(err,user)=>{
		One.find({},(err,one)=>{
			Post.find({},(err,post)=>{
				Back.find({},(err,back)=>{
					if(err){
					console.log(err);res.redirect("back");
				}
				else{
					res.render("./intermidiate/inter",{back:back,post:post,one:one[0],user:user[0],currentuser:req.user});
				}
				});
			});
		});
	});
	
});


//=============================NEW POST ROUTER=================================


//===================BACKGROUND ROUTER====================================================
//========================================================================================

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

//===============ROUTES========================
router.get("/editback",middleware.isLoggedIn,(req,res)=>{
	User.find({},(err,user)=>{
		if(err){console.log(err);return res.redirect("back");}
		Back.find({},(err,back)=>{
		if(err){console.log(err);return res.redirect("back");}
		res.render("./intermidiate/backform",{user:user[0],back:back[0],currentuser:req.user});
		});
	});
	
});
//====================PUT ROUTER=========================================
router.put("/editback",upload.single('image'),(req,res)=>{
	Back.find({},(err,back)=>{
		if(req.file){
		if(back[0] && back[0].imageId){
			cloudinary.v2.uploader.destroy(back[0].imageId, function(err1) {//start1==================
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
						back[0].imageId=result.public_id;
						back[0].image=result.secure_url;
						back[0].color=req.body.color;
						back[0].tcolor=req.body.tcolor;
						back[0].save();
						req.flash("success","NOW SHOW YOUR SKILLS AND MAKE THIS SITE BEAUTIFUL");
						res.redirect("/");
					}
				});
				}
			});//end1==============================
		}
		else{
			if(back[0])
			{
			cloudinary.v2.uploader.upload(req.file.path, function(err,result) {
					if(err){
						console.log("ERROR IN PUT ROUTES "+err);
				req.flash("error",err.message);
				res.redirect("back");
					}
					else{
						back[0].imageId=result.public_id;
						back[0].image=result.secure_url;
						back[0].color=req.body.color;
						back[0].tcolor=req.body.tcolor;
						back[0].save();
						req.flash("success","NOW SHOW YOUR SKILLS AND MAKE THIS SITE BEAUTIFUL");
						res.redirect("/");
					}
				});
			}
			else{
				cloudinary.v2.uploader.upload(req.file.path,function(err,result){
					if(err){
						console.log("ERROR IN PUT ROUTES" +err);
						req.flash("error",err.message);
						res.redirect("back");
					}
					else{
						var background={color:req.body.color,image:result.secure_url,imageId:result.public_id};
				Back.create(background,(err,b)=>{
					if(err){
						console.log(err);
					}
					else{
						console.log("BACKGROUND CREATED");
						req.flash("success","NOW SHOW YOUR SKILLS AND MAKE THIS SITE BEAUTIFUL");
						res.redirect("/");
					}
				});
					}
				});
			}
		}
	}
	else
		{
			if(back[0])
			{
			back[0].color=req.body.color;
			back[0].tcolor=req.body.tcolor;
			back[0].save();
			req.flash("success","NOW SHOW YOUR SKILLS AND MAKE THIS SITE BEAUTIFUL");
			res.redirect("/");
			}
			else{
				var background={color:req.body.color};
				Back.create(background,(err,b)=>{
					if(err){
						console.log(err);
					}
					else{
						console.log("BACKGROUND CREATED");
						req.flash("success","NOW SHOW YOUR SKILLS AND MAKE THIS SITE BEAUTIFUL");
						res.redirect("/");
					}
				});
			}
		}
	});
});

router.put("/inter/:name",middleware.isLoggedIn,(req,res)=>{
		One.find({},(err,one)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(req.params.name===one[0].category){
		one[0].category=req.body.category;
		one[0].title=req.body.title;
		one[0].desc=req.body.desc;
		one[0].icon=req.body.icon;
		one[0].oneText=req.body.oneText;
		one[0].oneBack=req.body.oneBack;
		one[0].twoText=req.body.twoText;
		one[0].twoBack=req.body.twoBack;
		one[0].threeText=req.body.threeText;
		one[0].threeBack=req.body.threeBack;
		one[0].save();
		Post.find({category:req.params.name},(err,post)=>{
			if(err){console.log(err);return res.rediect("back");}
			post.forEach(function(item){
				item.category=req.body.category;
			item.save();
			});
		});
					req.flash("success","Updated Successfully"+one[0].category);
				res.redirect("/");
		}
			else{
				Two.find({},(err,two)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(req.params.name===two[0].category){
		two[0].category=req.body.category;
		two[0].title=req.body.title;
		two[0].desc=req.body.desc;
		two[0].icon=req.body.icon;
		two[0].oneText=req.body.oneText;
		two[0].oneBack=req.body.oneBack;
		two[0].twoText=req.body.twoText;
		two[0].twoBack=req.body.twoBack;
		two[0].threeText=req.body.threeText;
		two[0].threeBack=req.body.threeBack;
		two[0].save();
					Post.find({category:req.params.name},(err,post)=>{
			if(err){console.log(err);return res.rediect("back");}
			post.forEach(function(item){
				item.category=req.body.category;
			item.save();
			});
		});
					req.flash("success","Updated Successfully"+two[0].category);
				res.redirect("/");
		}
			else{
				Three.find({},(err,three)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(req.params.name===three[0].category){
		three[0].category=req.body.category;
		three[0].title=req.body.title;
		three[0].desc=req.body.desc;
		three[0].icon=req.body.icon;
		three[0].oneText=req.body.oneText;
		three[0].oneBack=req.body.oneBack;
		three[0].twoText=req.body.twoText;
		three[0].twoBack=req.body.twoBack;
		three[0].threeText=req.body.threeText;
		three[0].threeBack=req.body.threeBack;
		three[0].save();
					Post.find({category:req.params.name},(err,post)=>{
			if(err){console.log(err);return res.rediect("back");}
			post.forEach(function(item){
				item.category=req.body.category;
			item.save();
			});
		});
					req.flash("success","Updated Successfully"+three[0].category);
				res.redirect("/");
		}
			else{
				Four.find({},(err,four)=>{
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(req.params.name===four[0].category){
		four[0].category=req.body.category;
		four[0].title=req.body.title;
		four[0].desc=req.body.desc;
		four[0].icon=req.body.icon;
		four[0].oneText=req.body.oneText;
		four[0].oneBack=req.body.oneBack;
		four[0].twoText=req.body.twoText;
		four[0].twoBack=req.body.twoBack;
		four[0].threeText=req.body.threeText;
		four[0].threeBack=req.body.threeBack;
		four[0].save();
					Post.find({category:req.params.name},(err,post)=>{
			if(err){console.log(err);return res.rediect("back");}
			post.forEach(function(item){
				item.category=req.body.category;
			item.save();
			});
		});
					
					req.flash("success","Updated Successfully"+four[0].category);
				res.redirect("/");
		}
			else{
				res.redirect("back");
			}
			}
	});
			}
			}
	});
			}
			}
	});
			}
			}
	});
});


//=====================================================================
module.exports=router;