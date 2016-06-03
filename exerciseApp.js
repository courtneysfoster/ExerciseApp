/* ********* Global Var declarations and Setup *********** */
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

/* ********* Routes & Handlers *********** */

/* Root */
app.get("/", function(req,res,next){
	var context = {};
	context.greeting = "Welcome to the Exercise Tracker!";
	res.render("home", context);
});

/* Select Query*/
app.get("/select", function(req,res,next){
	pool.query("SELECT id as 'ID', exercise as 'Exercise', reps as 'Reps', weight as 'Weight', date as 'Date', lbs as 'Units'  FROM workouts", function(err, rows, fields){
	//pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			console.log("query failure. " + err.description);
			next(err);
			return;
		}else{
			res.send(JSON.stringify(rows));
		}
	});
});

/* Insert Query */
app.post("/insert", function(req,res,next){
	var context={};
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
							res.send(context.results);
							return;	
						});
					}
				});
});

/* Delete Query */
app.post("/delete", function(req,res,next){
	console.log(req.body);
	var context={};
	pool.query("delete from workouts where id=?", [req.body.id], function(err, results){
		if (err){
			console.log("delete query failure. " + err.description);
			next(err);
			return;
		}else{
			pool.query("select * from workouts", function(err, rows, fields){
				context.results = rows;
				res.send(context.results);
				return;	
			});
		}
	});
});

/* Update Query */
app.post("/update", function(req,res,next){
	var context = {};
	pool.query("select * from workouts where id=?", [req.body.id], function(err,result){
		if(err){
			console.log("update select query failure. " + err.description);
			next(err);
			return;
		}else if(result.length==1){
			var curVals = result[0];
			
			pool.query("update workouts set exercise=?, reps=?, weight=?, date=?, lbs=? where id=?",
				
				
				[req.body.exercise || curVals.exercise
				, req.body.reps || curVals.reps
				, req.body.weight || curVals.weight
				, req.body.date || curVals.date
				, req.body.lbs || curVals.lbs
				, req.body.id]
				
				,function(err,result){
					if(err){
						console.log("update query failure. " + err.description);
						next(err);
						return;
					}else{
						pool.query("select * from workouts", function(err,rows,fields){
							context.results = rows;
							res.send(context.results);
						});
					}			
				});
		}
	});
});

/* delete old table and make a new one */
app.get("/make-table",function(req,res,next){
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "exercise VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
    res.redirect("back");
      });
  });
});

/* Error handlers and port listener */	
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

