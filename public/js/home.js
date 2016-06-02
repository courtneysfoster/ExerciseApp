/*Exercise Tracker home page javascript*/

var submitURL = "http://54.213.219.47:3000/formSubmit";
/* var submitURL = "http://localhost:3000/formSubmit"; */

document.getElementById("btnSubmit").addEventListener("click", function(){	
	
});

function init(){
	
}


document.addEventListener("DOMContentLoaded", afterPageLoad);

function afterPageLoad(){
	document.getElementById("exerciseSubmit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var data = {};
		req.open("POST", "http://54.213.219.47:3000", true);
		req.setRequestHeader("Content-Type", "application/json");
		req.addEventListener("load", function(){
			if(req.status >= 200 && req.status < 400){
				var dataResponse = JSON.parse(req.responseText);
				console.log(dataResponse.data);
			}else{
				console.log("Error: " + req.statusText);
			}
		});
		console.log(JSON.stringify(data));
		req.send(JSON.stringify(data));
		event.preventDefault();
	});
	var table = document.createElement("table");
table.id = "tblOutput";
table.border = 1;
table.style.borderCollapse = "collapse";

var td;
for (var i=0; i<4; i++){
	for (var j=0; j<4; j++){
		td = document.createElement("td");
		td.id = ("td"+j)+i;
		switch (i){
			case 0:
				var nr = document.createElement("th");
				table.appendChild(nr);
				td.textContent = "Header " + (j+1);
				break;
			default:
				if (j==0){
					var nr = document.createElement("tr");
					nr.style.textAlign = "center";
					table.appendChild(nr);
				}
				td.textContent = (j+1) + ", " + (i);		
		}
		nr.appendChild(td);
	}
}
document.getElementById("outputArea").appendChild(table);
}
