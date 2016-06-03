/*Exercise Tracker home page javascript*/

function buildTable(response){
	
	var table = document.getElementById("tblOutput");
	table.parentNode.removeChild(table);
	
	table = document.createElement("table");
	table.id = "tblOutput";
	table.border = 1;
	table.style.borderCollapse = "collapse";
	
	var idCol = document.createElement("col");
	idCol.style.visibility ="hidden";
	table.appendChild(idCol);
	
	
	var th = document.createElement("th");
	table.appendChild(th);
	
	var td;
	var colNames = [];
    var item = response[0];
    for (var key in item) {
        colNames.push(key);
		td = document.createElement("td");
		td.textContent = key;
		th.appendChild(td);
    }
	var tr;
	for(var i=0, iLen=response.length; i<iLen; i++){
		tr = document.createElement("tr");
		item = response[i];
		
		for(var j=0; j<colNames.length; j++){
			console.log(item[colNames[j]]);
			if (item[colNames[j]]=="lbs"){
				if(item[colNames[j]].value==1){
					td.textContent = "Lbs";
				}else{
					td.textContent = "Kgs";
				}
			}else{
				td.textContent = item[key].value;
				tr.appendChild(td);		
			}
			//console.log(td.textContent);
			
		}
	}
	document.getElementById("outputArea").appendChild(table);
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
			var response = JSON.parse(req.responseText);
			buildTable(response);
		}else{
			console.log("error " + req.status + " " + req.statusText);
			return;
		}
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