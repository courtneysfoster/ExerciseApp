/*Exercise Tracker home page javascript*/

var submitURL = "http://54.213.219.47:3000/formSubmit";
/* var submitURL = "http://localhost:3000/formSubmit"; */

document.getElementById("btnSubmit").addEventListener("click", function(){	
	
});

function submitForm(){
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
}

function buildTable(response){
	var table = document.getElementById("tblOutput");
	table.parentNode.removeChild(table);
	

}

document.addEventListener("DOMContentLoaded", afterPageLoad);

function afterPageLoad(){
	document.getElementById("btnSubmit").addEventListener("click", function(event){
		var req = new XMLHttpRequest();
		var data = {};
		req.open("GET", "http://54.213.219.47:3000/select", true);
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
				// 0 = header row
				case 0:
					var nr = document.createElement("th");
					table.appendChild(nr);
					td.textContent = responseText.exercise;
					break;
				// else table data
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


	

    

            newEntryReq.addEventListener('load', function(){

            if(newEntryReq.status >= 200 && newEntryReq.status < 400){

                var newEntryResponse = JSON.parse(newEntryReq.responseText);

                console.log(newEntryResponse.data);

            }

            else

                console.log('Error in network request: ' + newEntryReq.statusText);

            });

 

            console.log(JSON.stringify(newEntry));

            newEntryReq.send(JSON.stringify(newEntry));

            event.preventDefault();

            });

        }

 