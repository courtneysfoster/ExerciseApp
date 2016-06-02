/*Exercise Tracker home page javascript*/

var submitURL = "http://54.213.219.47:3000/formSubmit";
/* var submitURL = "http://localhost:3000/formSubmit"; */


function submitForm(){

}

function buildTable(response){
	var table = document.getElementById("tblOutput");
	table.parentNode.removeChild(table);
	

}

document.addEventListener("DOMContentLoaded", afterPageLoad);

function afterPageLoad(){
	/* Initial table select section */
	var req = new XMLHttpRequest();
		var data = {};
		req.open("GET", "http://54.213.219.47:3000/select", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function(){
			if(req.status >= 200 && req.status < 400){
				var dataResponse = [];
				dataResponse =  JSON.parse(req.responseText);
				console.log(dataResponse.response);
			}else{
				console.log("Error: " + req.statusText);
			}
		});
		req.send(JSON.stringify(data));
	
	/* button click event listener */
	document.getElementById("btnSubmit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var data = {};
		data.exercise = document.getElementById("txtExercise").value;
		data.reps = document.getElementById("txtReps").value;
		data.weight = document.getElementById("txtWeight").value;
		if (document.getElementById("optLbs").checked){
			data.lbs = 1;
		}else{
			data.lbs = 0;
		}
		req.open("POST", "http://54.213.219.47:3000/formSubmit", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function(){
			if (req.status>200 && req.status<400){
				var response = JSON.parse(req.response);
			}else{
				console.log("error " + req.statusText);
			}
		});
		event.preventDefault();
	});
}


function getDate(){
	var dtDate = new date(date.now());
	var dtString = dtDate.getFullYear() + "-" + dtDate.getMonth() + "-" + dtDate.getDay();
	document.getElementById("txtDate").value = dtString;
	return;
}