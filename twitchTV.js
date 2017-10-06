var module = (function(){
	var storedValue = [];
	var storedStatus = [];
	var featured = [];
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

console.log("got to module");
	return {
		store: function(val){
	
			storedValue.push(val);
			console.log("got to module.store");
			module.updateDisplay();
		},

		retrieve: function(){
			return storedValue;
		},
		storeStatus: function(id){
			storedStatus.push(id);
			console.log("got to module.store");
			
		},

		retrieveStatus: function(){
			return storedStatus;
		},

		storeFeatured: function(data){
			featured.push(data);
			console.log("got to module.store");
			module.addLiveUser()
		},

		retrieveFeatured: function(){
			return featured;
		},

		addLiveUser: function(){
			liveUser = module.retrieveFeatured()[0]["featured"][0]["stream"]["channel"]["display_name"];
			users.push(liveUser);
			users.forEach(requestJSONP);
		},

		returnUsers: function(){
			return users;
			
		},


		updateDisplay: function(){
			/*splayArray();*/
			displayUserInfo()

		}
	}

}());


//Wait for DOM to load before adding event listener on button

document.addEventListener('DOMContentLoaded', getLiveStream);


function requestJSONP(user) {
	//dynamically create a script tag
	var scriptTag = document.createElement("script");
	//set url with user defined search parameter
	scriptTag.src = "https://wind-bow.gomix.me/twitch-api/users/눈꽃눈꽃" + user + "?callback=module.store";
	//append tag to head element 
	document.getElementsByTagName("head")[0].appendChild(scriptTag);
	console.log("got to JSONP");
};

function requestStreamStatus(id) {
	//dynamically create a script tag
	var scriptTag = document.createElement("script");
	//set url with user defined search parameter
	scriptTag.src = "https://wind-bow.gomix.me/twitch-api/streams/" + id + "?callback=module.storeStatus";
	//append tag to head element 
	document.getElementsByTagName("head")[0].appendChild(scriptTag);
	console.log("got to streamStatus");
};

function getLiveStream(){
	//dynamically create a script tag
	var scriptTag = document.createElement("script");
	//set url with user defined search parameter
	scriptTag.src = "https://wind-bow.glitch.me/twitch-api/streams/featured?callback=module.storeFeatured";
	//append tag to head element 
	document.getElementsByTagName("head")[0].appendChild(scriptTag);
	console.log("got to getLiveStream");
}



function dispalyjsonpPayload(){
var header = document.getElementsByTagName("header");
header.textContent = module.retrieve();
}

function displayUserInfo(){
	var username =  Array.prototype.slice.call(document.querySelectorAll(".user p"));
	var userImage = Array.prototype.slice.call(document.querySelectorAll(".user IMG"));
	var userInfo = module.retrieve();

	for (var i = 0; 0 < userInfo.length; i++){
		username[i].textContent = userInfo[i].display_name;
		userImage[i].src = userInfo[i].logo;
		console.log(userInfo[i]["_id"]);
		requestStreamStatus(userInfo[i]["_id"]);
	}

}

