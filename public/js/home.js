/*Exercise Tracker home page javascript*/

var submitURL = "http://54.213.219.47:3000/formSubmit";
/* var submitURL = "http://localhost:3000/formSubmit"; */


document.getElementById("btnSubmit").addEventListener("click", function(){	
	
});

function init(){
	
}

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


