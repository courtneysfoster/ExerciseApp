/*Exercise Tracker home page javascript*/

var submitURL = "http://54.213.219.47:3000/formSubmit";
/* var submitURL = "http://localhost:3000/formSubmit"; */

document.getElementById("btnSubmit").addEventListener("click", function(){	
	var inputForm = document.getElementById("frmInput");
	var req = new XMLHttpRequest();
	var inputParams = {"id":4};
	/*
	for(var i=0, iLen=inputForm.length; i<iLen; i++){
		inputParams.push({"name":inputForm[i].name, "value":inputForm[i].value}); 
	}
	*/
	req.open("POST", "http://54.213.219.47:3000/formSubmit", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(inputParams));
	
	
});

function init(){
	
}


