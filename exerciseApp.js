var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var mysql = require("mysql");
var pool = mysql.createPool({
	host: "localhost",
	user: "student",
	password: "default",
	database: "student"
});

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main.handlebars"});
var bodyParser = require("body-parser");
var path = require("path");

app.use(session({secret:"pw"}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);


app.get("/", function(req,res,next){
	var context={};
	if(!req.session.name){
		/* If no prior session exists, then return empty dataset for table structure */
		pool.query("select * from workouts where sessionID = -1", function(err, rows, fields){
			if (err){
				next(err);
				console.log("query failure. " + err.description);
				return;
			}else{
				context.results = JSON.stringify(rows);
				context.greeting = "Welcome to the Exercise Tracker!";
				console.log("query success. No prior session." + context.greeting);
				res.render("home", context);
			}
		});
		
	}else{	//Session exists, get user information by sessionID.
		context.name = req.session.name;
		context.greeting  = "Welcome back to the Exercise Tracker " + context.name;
		context.id = req.session.id;
		pool.query("select * from workouts where sessionID=" + context.id,function(err, rows, fields){
			if (err){
				next(err);
				console.log("query failure. " + err.description);
				return;
			}else{
			console.log("query success. Prior Session.");
			context.results = JSON.stringify(rows);
			res.render("home", context);
			}
		});
		
	}
	
	
});

app.post("/formSubmit", function(req,res,next){
	var context={};
	var qParams=[];
	for (var p in req.body){
		qParams.push({"name":p, "value":req.body[p]});
		if(err){
			next(err);
			return;
		}
	}
	context.dataList = qParams;
	res.render("postTest", context);
});

function genContext(){
	var stuffToDisplay = {}; 
	stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString("en-US");
	
	stuffToDisplay.todo = function(){
		var HTMLstr = "<ul>Things to do</ul>";
		for(var i=0; i<10; i++){
			HTMLstr = HTMLstr + "<li>Item "+i+"</li>";
		}
		return HTMLstr;
	}
	return stuffToDisplay;
}

app.get("/time", function(req,res){
	res.render("time", genContext());
});

app.get("/make-table",function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
	"sessionID INT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table Created";
      res.render("home",context);
      });
  });
});

app.use(function(req,res){
	res.status(404);
	res.render("404");
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type("plain/text");
	res.status(500);
	res.send("500 - Internal Server Error");
});

app.listen(app.get("port"), function(){
	console.log("Express started on http://54.213.219.47:" + app.get("port") + "; press ctrl+c to terminate");
});

