/*Exercise Tracker home page javascript*/
var ip = "http://52.23.211.180:6645/";

document.addEventListener("DOMContentLoaded", afterPageLoad);

function afterPageLoad(){
	var req = new XMLHttpRequest();
	var data = {};
	req.open("GET", ip+"select", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.addEventListener("load", function(dataResponse, status){
		if(req.status >= 200 && req.status < 400){
			dataResponse =  JSON.parse(req.responseText);
			buildTable(dataResponse);
		}else{
			console.log("Error: " + req.status + ", " + req.statusText);
		}
	});
	req.send(JSON.stringify(data));
}

/* button click event listeners */
document.getElementById("btnNew").addEventListener("click", function(event){
	if(document.getElementById("txtExercise").value==""){
		alert("Exercise field cannot be blank!");
		return;
	}
	Submit("insert", getData("form"));
	event.preventDefault();
});

document.getElementById("btnUpdate").addEventListener("click", function(event){
	if(document.getElementById("txtExercise").value==""){
		alert("Exercise field cannot be blank!");
		return;
	}
	Submit("update", getData("form"));
	event.preventDefault();
});

function Submit(type, data){
	var req = new XMLHttpRequest();
	req.open("POST", ip+type, true);
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
	clearForm();
}



function button_click(directive, idx){
	var table = document.getElementById("tblOutput");
	switch (directive){
		case "Edit":
			if(document.getElementById("txtExercise").value!=""){
				if(!confirm("There is unsaved data in the form. Click 'no' to cancel. click 'yes' to discard.")){
					return;
				}
			}
			var rIdx = 1;
			var cIdx = 0;
			
			for(rIdx=1, rLen=table.rows.length; rIdx<rLen; rIdx++){
				var cellVal = table.rows[rIdx].cells[cIdx].textContent;
				if(cellVal==idx){
					fillForm(getData("table", table, rIdx));
					document.getElementById("btnUpdate").type="button";
					document.getElementById("lgdInputHeader").textContent = "Edit Existing Workout";
					break;
				}
			}
			break;
			
		case "Delete":
			Submit("delete", {"id": idx});
			break;
		default:
			/* Should never get here. */
	}
}

function getData(inputFrom, table, rIdx){
	var tblData = {};
	if (inputFrom=="form"){
		if(document.getElementById("txtID").value==""){
			tblData.id = null;
		}else{
			tblData.id = document.getElementById("txtID").value; 
		}
		tblData.exercise = document.getElementById("txtExercise").value;
		tblData.reps = document.getElementById("txtReps").value;
		tblData.weight = document.getElementById("txtWeight").value;
		tblData.date = document.getElementById("txtDate").value;
		tblData.lbs = document.getElementById("chkLbs").checked;
	}else{
		tblData.id=table.rows[rIdx].cells[0].textContent;
		tblData.exercise=table.rows[rIdx].cells[1].textContent;
		tblData.reps=table.rows[rIdx].cells[2].textContent;
		tblData.weight=table.rows[rIdx].cells[3].textContent;
		tblData.date=table.rows[rIdx].cells[4].textContent;
		tblData.lbs=(table.rows[rIdx].cells[5].textContent=="Lbs")
	}
	return tblData;
}

function fillForm(data){
	document.getElementById("txtID").value=data.id;
	document.getElementById("txtExercise").value=data.exercise;
	document.getElementById("txtReps").value=data.reps;
	document.getElementById("txtWeight").value=data.weight;
	document.getElementById("txtDate").value=data.date;
	document.getElementById("chkLbs").checked=data.lbs;
}

function clearForm(){
	document.getElementById("txtID").value="";
	document.getElementById("txtDate").value="";
	document.getElementById("txtExercise").value="";
	document.getElementById("txtReps").value="";
	document.getElementById("txtWeight").value="";
	document.getElementById("chkLbs").checked=1;
	document.getElementById("btnUpdate").type="hidden";
	document.getElementById("lgdInputHeader").textContent="Input New Workout";
}

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
	if(response.length==0){
		tr = document.createElement("tr");
		td = document.createElement("th");
		td.textContent = "exercise";
		tr.appendChild(td);
		td = document.createElement("th");
		td.textContent = "reps";
		tr.appendChild(td);
		td = document.createElement("th");
		td.textContent = "weight";
		tr.appendChild(td);
		td = document.createElement("th");
		td.textContent = "date";
		tr.appendChild(td);
		td = document.createElement("th");
		td.textContent = "units";
		tr.appendChild(td);
		table.appendChild(tr);
		document.getElementById("outputArea").appendChild(table);
		return;
	}
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
				td.style.display = "none";
			}
			tr.appendChild(td);
		}
		if (i!=-1){
			
			td = document.createElement("td");
			tr.appendChild(td);
			btnEdit = document.createElement("button");
			btnEdit.id = "btnEdit-"+item["id"];
			btnEdit.textContent = "Edit";
			
			td.appendChild(btnEdit);
			
			td = document.createElement("td");
			tr.appendChild(td);
			btnDel = document.createElement("button");
			btnDel.id = "btnDel-"+item["id"];
			btnDel.textContent = "Delete";
			td.appendChild(btnDel);
			(function(idx){
				btnEdit.addEventListener("click", function(){button_click("Edit", idx)});
				btnDel.addEventListener("click", function(){button_click("Delete", idx)});
			})(item["id"]);
		}

		table.appendChild(tr);
	}
	document.getElementById("outputArea").appendChild(table);
}

function getDate(){
	var dtDate = new date(date.now());
	var dtString = dtDate.getFullYear() + "-" + dtDate.getMonth() + "-" + dtDate.getDay();
	document.getElementById("txtDate").value = dtString;
	return;
}
