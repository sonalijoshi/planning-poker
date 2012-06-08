
var socket = io.connect('http://10.101.95.227:3001');
socket.on('gameStarted', function (data) {
	var addVote = document.getElementById("addVote");
	addVote.style.display = 'block'; 
	
	var userMessage = document.getElementById("userJoined");
	userMessage.style.display = 'none'; 
});
