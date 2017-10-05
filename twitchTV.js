var module = (function(){
	var storedValue = [];
console.log("got to module");
	return {
		store: function(val){
			storedValue.push(val);
			console.log("got to module.store");
			dispalyjsonpPayload();
		},

		retrieve: function(){
			return storedValue;
		},
		searchTerm: function(){
			return storedValue[0][0];
		},

		searchResultTitles: function(){
			return storedValue[0][1];
		},

		searchResultdescription: function(){
			return storedValue[0][2];
		},

		searchResultUrl: function(){
			return storedValue[0][3];
		},

		updateDisplay: function(){
			/*splayArray();*/
			displaySearchTerm();
			displayTitles();
			displaySummary();
			updateResultsUrl()
		}
	}

}());


//Wait for DOM to load before adding event listener on button

document.addEventListener('DOMContentLoaded', requestJSONP);

var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
users.forEach(requestJSONP);




function requestJSONP(user) {
	//dynamically create a script tag
	var scriptTag = document.createElement("script");
	//set url with user defined search parameter
	scriptTag.src = "https://wind-bow.gomix.me/twitch-api/users/" + user + "?callback=module.store";
	//append tag to head element 
	document.getElementsByTagName("head")[0].appendChild(scriptTag);
	console.log("got to JSONP");
};

function dispalyjsonpPayload(){
var header = document.getElementsByTagName("header");
header.textContent = module.retrieve();
}

function displayUserInfo(){
var username =  Array.prototype.slice.call(document.querySelectorAll(".user p"));
var userImage = Array.prototype.slice.call(document.querySelectorAll(".user IMG"));
var userInfo = module.retrieve()

for (var i = 0; 0 < userInfo.length; i++){
	username[i].textContent = userInfo[i].display_name;
	userImage[i].src = userInfo[i].logo;
}

}

