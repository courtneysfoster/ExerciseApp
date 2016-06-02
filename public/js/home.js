/*Exercise Tracker home page javascript*/

function buildTable(response){
	
	var table = document.getElementById("tblOutput");
	table.parentNode.removeChild(table);
	
	table = document.createElement(table);
	table.id = "tblOutput";
	table.border = 1;
	table.style.borderCollapse = "collapse";
	
	for (var i=0; i<7; i++){
		var th = document.createElement("th");
		var td = document.createElement("td");
		td.textContent = "Exercise";
		table.appendChild(th);
	}
}

document.addEventListener("DOMContentLoaded", afterPageLoad);

function afterPageLoad(){
	/* Initial table select section */
	var req = new XMLHttpRequest();
		var data = {};
		req.open("GET", "http://54.213.219.47:3000/select", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function(dataResponse, status){
			if(req.status >= 200 && req.status < 400){
				dataResponse =  JSON.parse(req.responseText);
			}else{
				console.log("Error: " + req.statusText);
			}
		});
		req.send(JSON.stringify(data));
}

/* button click event listener */
document.getElementById("btnNew").addEventListener("click", function(event){
	
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
	
	req.open("POST", "http://54.213.219.47:3000/insert", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load", function(){
		if (req.status>=200 && req.status<400){
			console.log(req.responseText);
			var response = JSON.parse(req.responseText);
			console.log("req.status= " + req.status);
			buildTable(response);
			console.log("passed buildTable");
		}else{
			console.log("error " + req.status + " " + req.statusText);
			return;
		}
		console.log("We fell through the cracks");
	});
	req.send(JSON.stringify(data));
	event.preventDefault();
});

function getDate(){
	var dtDate = new date(date.now());
	var dtString = dtDate.getFullYear() + "-" + dtDate.getMonth() + "-" + dtDate.getDay();
	document.getElementById("txtDate").value = dtString;
	return;
}