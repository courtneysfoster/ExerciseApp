/* ********* Var declarations and setup *********** */
var express = require("express");
var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main.handlebars"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

var mysql = require("mysql");
var pool = mysql.createPool({
	host: "localhost",
	user: "student",
	password: "default",
	database: "student"
});

app.set("port", 3000);

/* ********* Routes & Code *********** */

app.get("/", function(req,res,next){
	var context = {};
	context.greeting = "Welcome to the Exercise Tracker!";
	res.render("home", context);
});

app.get("/select", function(req,res,next){
	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			console.log("query failure. " + err.description);
			next(err);
			return;
		}else{
			res.send(JSON.stringify(rows));
		}
	});
});

app.post("/formSubmit", function(req,res,next){
	var context={};
	/*
	var dtDate = req.body.date;
	var dtString = (dtDate.getFullYear() + "-" + dtDate.getMonth() + "-" + dtDate.getDay());
	console.log(dtString);
	*/
	pool.query("insert into workouts" + 
			  "(`exercise`, `reps`, `weight`, `date`, `lbs`)" +
			  "values (?, ?, ?, ?, ?)"
			  , [req.body.exercise
			  , req.body.reps
			  , req.body.weight
			  , req.body.date
			  , req.body.lbs] 
			  , function(err, results){
					if (err){
						console.log("insert query failure. " + err.description);
						next(err);
						return;
					}else{
						pool.query("select * from workouts", function(err, rows, fields){
							context.results = rows;
							res.render("home", context);
							return;	
						});
					}
				});
	});

app.get("/make-table",function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "exercise VARCHAR(255) NOT NULL,"+
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

app.get('/insert',function(req,res,next){
  console.log("we got here");
  var context = {};
   pool.query("insert into workouts (exercise, reps, ) values (?, ?, ?, ?, ?)"
			, [req.query.exercise, req.query.reps, req.query.weight, req.query.date, req.query.lbs] 
			,function(err, result){
		if(err){
			next(err);
			return;
		}
		context.results = "Insert successful. " + result.insertID;
		res.render('home',context);
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

