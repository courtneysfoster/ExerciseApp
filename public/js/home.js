/*Exercise Tracker home page javascript*/

function buildTable(response){
	
	
	document.getElementById("outputArea").removeChild(document.getElementById("tblOutput"));
	
	var table = document.createElement("table");
	table.id = "tblOutput";
	table.border = 1;
	table.style.borderCollapse = "collapse";
	table.align = "center";

	var idCol = document.createElement("col");
	idCol.id = "colID";
	table.appendChild(idCol);
	
	var tr;
	var td;
	var btnEdit;
	var btnDel;
    for (var i=-1, iLen=response.length; i<iLen; i++){
		if (i==-1){
			item = response[0];
		}else{
			item = response[i];
		}
		tr = document.createElement("tr");
		tr.style.textAlign = "center";
		for (var key in item){
			switch (i){
				case -1:
					td = document.createElement("th");	
					if(key=="lbs"){
						td.textContent = "Units";
					}else{
						td.textContent = key;	
					}
					break;
				default:
					td = document.createElement("td");
					if (key=="lbs"){
						if(item[key]==1){
							td.textContent = "Lbs";
						}else{
							td.textContent = "Kgs";
						}
						btnEdit = document.createElement("button")
					}else{
						td.textContent = item[key];
					}		
			}
			if(key=="id"){
				td.display = "none";
			}
			tr.appendChild(td);
		}
		if (i!=-1){
			
			td = document.createElement("td");
			tr.appendChild(td);
			btnEdit = document.createElement("button");
			btnEdit.id = "btnEdit-"+item["id"];
			btnEdit.value = "Edit";
			btnEdit.addEventListener("click", function(){button_click("Edit", item["id"])});
			td.appendChild(btnEdit);
			
			td = document.createElement("td");
			tr.appendChild(td);
			btnDel = document.createElement("button");
			btnDel.id = "btnDel-"+item["id"];
			btnDel.value = "Delete";
			btnDel.addEventListener("click", function(){button_click("Delete", item["id"])});
			td.appendChild(btnDel);
		}
		table.appendChild(tr);
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

function button_click(directive, idx){
	switch (directive){
		case "Edit":
			
			break;
		case "Delete":
			/* Call Delete Function */
			break;
		default:
			/* Should never get here. */
			
	}
}