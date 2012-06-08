var socket = io.connect('http://10.101.95.227:3001');
socket.emit('voteStarted', {});
