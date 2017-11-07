
document.addEventListener('DOMContentLoaded', addEventListeners);

function addEventListeners() {
    var onlineButton = document.getElementById("online");
    var offlineButton = document.getElementById("offline");
    var allButton = document.getElementById("all");
    onlineButton.addEventListener("click", clickOnline);
    offlineButton.addEventListener("click", clickOffline);
    allButton.addEventListener("click", clickAll);
}



var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "twitchpresents"].forEach(fetchUser);
var userOb = [];



function fetchUser(user){

	Promise.all([
	  fetch('https://wind-bow.glitch.me/twitch-api/users/' + user, {
	    method: 'GET',
	    mode: 'cors',
	    headers: new Headers({
	      'Content-Type': 'text/plain'
	    })
	  }).then(function (user) {
	    return user.json();
	  }),
	  fetch('https://wind-bow.glitch.me/twitch-api/streams/' + user, {
	    method: 'GET',
	    mode: 'cors',
	    headers: new Headers({
	      'Content-Type': 'text/plain'
	    })
	  }).then(function (stream) {
	    return stream.json();
	  })
	]).then(function (combined) {
	
		user = {
			name: combined[0].display_name,
			id: combined[0]._id,
			logo: combined[0].logo,
		}			
		console.log(combined[0])
		if (combined[1].stream !== null){
			user.status = "Online";
		} else{
			user.status = "Offline";
		};

	  return user;
	}).then(function(user){
		//create new div and append to main 
    createUserDiv(user);
    userOb.push(user);
	})
}

function createUserDiv(user){

	var div = document.createElement("div");
    div.className = "user";
    
    var img = document.createElement("img");
    img.src = user.logo;
    div.appendChild(img);
    
    var innerDiv = document.createElement("div");
    innerDiv.className = "info";
    div.appendChild(innerDiv);
    var header = document.createElement("header"); 
    header.textContent = user.name;
    innerDiv.appendChild(header);
    var p = document.createElement("p");
    innerDiv.appendChild(p);

    var i = document.createElement("i");
    div.appendChild(i);
        i.textContent = user.status;
    

    var main = document.getElementsByTagName("main")[0];
    main.appendChild(div);
}

function cleanMain(){
	userDiv = document.querySelectorAll(".user");
	userDiv.forEach(function(div){
    	div.parentNode.removeChild(div)})
}

function clickOnline(){
	cleanMain();

	userOb.forEach(function(user){
		if (user.status === "Online"){
			createUserDiv(user);
		}
	})
}

function clickOffline(){
	cleanMain();

	userOb.forEach(function(user){
		if (user.status === "Offline"){
			createUserDiv(user);
		}
	})
}

function clickAll(){
	cleanMain();

	userOb.forEach(function(user){
			createUserDiv(user);
	})
}
