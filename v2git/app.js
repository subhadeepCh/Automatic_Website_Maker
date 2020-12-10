var express = require("express"),
	app     = express(),
	mongoose=require("mongoose"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	flash=require("connect-flash"),
	methodOverride=require("method-override"),	
	bodyParser= require("body-parser"),
	User   = require("./models/user"),
	One = require("./models/one"),
	Two = require("./models/two"),
	Three = require("./models/three"),
	Four = require("./models/four"),
	Post = require("./models/post"),
	Back = require("./models/background"),
	indexRouter=require("./routes/index"),
	userRouter =require("./routes/user"),
	oneRouter  =require("./routes/one"),
	twoRouter= require("./routes/two"),
	threeRouter=require("./routes/three"),
	fourRouter=require("./routes/four");

//=======================================
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//=======================================
mongoose.connect("mongodb+srv://subhadeep:<password>@cluster0-obeft.mongodb.net/Portfolio?retryWrites=true&w=majority",{
	useNewUrlParser :true,
	useCreateIndex:true,
	useUnifiedTopology:true
}).then(()=>{
	console.log("CONNECTED TO DATABASE - app.js");
}).catch(err=>{
	console.log("Error - app.js :",err.message);
});
//=======================================
//=========PASSPORT CONFIG FOR USER AUTH===================
app.use(require("express-session")({
	secret:"This message is used to encode and decode",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========================================================
//=========================================================
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});     
//=========================================================
app.use("/",indexRouter);
app.use("/",userRouter);
app.use("/",oneRouter);
app.use("/",twoRouter);
app.use("/",threeRouter);
app.use("/",fourRouter);
//=========================================================
app.get("*",(req,res)=>{
	req.flash("error","UNABLE TO FIND PAGE!")
	res.redirect("/");
});
app.listen(process.env.PORT,process.env.IP,()=>{
	console.log("SERVER STARTED");
});