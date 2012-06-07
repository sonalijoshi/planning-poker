var express = require('express')
  , app = module.exports = express.createServer()
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , db
  , User
  , io = require('socket.io').listen(app);
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/planningpoker-development');
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
  db = mongoose.connect('mongodb://localhost/planningpoker-production');
});

app.User = User = require('./models.js').User(db);

// Routes
app.get('/', routes.index);
app.get('/join', routes.join);

app.get('/users', function(req, res){
  User.find({}, function(err, users) {
	res.render('users/index.jade', {
		locals: { users: users }
    });
  });
});


app.post('/join', function(req, res){
  var user = new User({name: req.param('name', null), email: req.param('email', null) });
  user.save();
  res.render('users/add-vote.jade', {locals: {userId: user._id}} );
});

app.get('/start-vote', routes.startVote);

app.get('/add-vote', routes.addVote);
var usersVotes = {};

app.post('/add-vote', function(req, res) {
	usersVotes[req.param('userId', null)] = req.param('vote', null);
	console.log(io.sockets.clients().length);
	if (io.sockets.clients().length == Object.keys(usersVotes).length) {
		res.render('results.jade', {locals: { usersVotes: usersVotes}});
	}
	res.render('voting-in-progress.jade');
});

app.post('/start-vote', function(req, res){
	res.render('vote-started.jade');
});
io.sockets.on('connection', function (socket) {
  socket.on('voteStarted', function() {
	socket.broadcast.emit('gameStarted', { hello: 'world' });
  });
});

app.listen(3001, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
