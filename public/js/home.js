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
	
    for (var i=-1, iLen=response.length; i<iLen; i++){
		if (i=-1){
			item = response[0];
			return;
		}else{
			item = response[i];
		}
		
		for (var key in item){
			td = document.createElement("td");
			switch (i){
				case -1:
					var nr = document.createElement("th");
					table.appendChild(nr);
					td.textContent = key;
					break;
				default:
					if (key=="id"){
						var nr = document.createElement("tr");
						nr.style.textAlign = "center";
						table.appendChild(nr);
						break;
					}
					if (key=="lbs"){
						if(item[key]==1){
							td.textContent = "Lbs";
						}else{
							td.textContent = "Kgs";
						}
					}else{
						td.textContent = item[key];
					}		
			}
			nr.appendChild(td);
		}
		
	}
/*
	for (var key in item) {
    
		td = document.createElement("td");
		td.textContent = key;
		th.appendChild(td);
    } 
	
	var tr;
	for(var i=0, iLen=response.length; i<iLen; i++){
		tr = document.createElement("tr");
		item = response[i];
		
		for(var key in item){
			td = document.createElement("td");
			if (key=="lbs"){
				if(item[key]==1){
					td.textContent = "Lbs";
				}else{
					td.textContent = "Kgs";
				}
			}else{
				td.textContent = item[key];
				
			}
			tr.appendChild(td);		
		}
		table.appendChild(tr);
	}
*/
	document.getElementById("outputArea").appendChild(table);
}
/*



for (var i=0, iLen=response.length; i<iLen; i++){
	for (var key in item){
		td = document.createElement("td");
		switch (i){
			case 0:
				var nr = document.createElement("th");
				table.appendChild(nr);
				td.textContent = td.textContent = key; ;
				break;
			default:
				if (key=="id"){
					var nr = document.createElement("tr");
					nr.style.textAlign = "center";
					table.appendChild(nr);
				}
				if (key=="lbs"){
					if(item[key]==1){
						td.textContent = "Lbs";
					}else{
						td.textContent = "Kgs";
					}
				}else{
					td.textContent = item[key];
				}		
		}
		nr.appendChild(td);
	}
}
*/

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
	data.date = document.getElementById("txtDate").value;
	data.lbs = document.getElementById("optLbs").checked;
	
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