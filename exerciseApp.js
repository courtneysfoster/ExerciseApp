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
	var context={};
	console.log("this is where the error is");
	pool.query("select * from workouts", function(err, rows, fields){
		if (err){
			
			next(err);
			console.log("query failure. " + err.description);
			return;
		}else{
			context.results = JSON.stringify(rows);
			context.greeting = "Welcome to the Exercise Tracker!";
			var dtDate = (new Date(Date.now())).toLocaleDateString('en-US');
			context.date = (dtDate.getMonth() + 1) + "-" + dtDate.getDate() + "-" + dtDate.getFullYear();
			res.render("home", context);
		}
	});
});

app.post("/formSubmit", function(req,res,next){
	var context={};
	
	pool.query("INSERT INTO workouts" + 
			  "(`name`, `reps`, `weight`, `date`, `lbs`) values (?)"
			  , [req.body.name]
			  , [req.body.reps]
			  , [req.body.weight]
			  , [req.body.date]
			  , [req.body.lbs]
			  , function(err, rows){
				
					if (err){
						next(err);
						console.log("insert query failure. " + err.description);
						return;
					}else{
						context.results = JSON.stringify(rows);	
						res.render("home",context);
					}
				});
	/*
	context.results = JSON.stringify(req.body);
	res.render("home",context);
	*/
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
  pool.query("INSERT INTO workouts (`id`) VALUES (?)", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
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

