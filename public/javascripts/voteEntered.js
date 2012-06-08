var socket = io.connect('http://10.101.95.227:3001');
socket.emit('voteEntered', {});
socket.on('gameEnded', function (data) {
	var results = document.getElementById("results");
	
	var message = document.createElement("div");
	message.setAttribute("id", "finalVotes"); 
	message.innerHTML = "The votes are:"
	results.appendChild(message);
	
	var resultsList = document.createElement("ul");
	results.appendChild(resultsList); 
	
	var usersVotes = data['usersVotes'];
	
	for (var key in usersVotes) {
		var vote = document.createElement("li");
		vote.innerHTML = usersVotes[key];
		resultsList.appendChild(vote);
	}
	
	var voteInProgress = document.getElementById("voteInProgress");
	voteInProgress.style.display = "none";
	
});
