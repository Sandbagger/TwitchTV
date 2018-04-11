
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
		console.log(combined[1])
		if (combined[1].stream !== null){
			user.status = "Watch Now!";
			user.info = combined[1].stream.channel.game;
			user.viewers = combined[1].stream.viewers;
			user.url = combined[1].stream.channel.url;
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
    

    var eye = document.createElement("i");
    if (user.status !== "Offline"){
    	eye.setAttribute('class', "fa fa-eye fa-1x");
    	eye.textContent = ' ' + user.viewers + ' - ' + user.info;
	}

     innerDiv.appendChild(eye);
    
     var i = document.createElement("i");
       var a = document.createElement("a");
    if (user.status !== "Offline"){
    i.setAttribute("href", user.url);
    i.setAttribute('class', "fa fa-play-circle-o fa-3x");

    var a = document.createElement("a");
     a.setAttribute("href", user.url);
     a.appendChild(i);
     
     div.appendChild(a);

	}else{i.setAttribute('class', "fa fa-bed fa-3x");
	img.style.opacity = "0.3"};
	div.appendChild(i);
    

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
		if (user.status === "Watch Now!"){
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
