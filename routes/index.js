require('../models.js');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * GET users page.
 
exports.users = function(req, res){
  var users = User.find({},
                [], { sort: ['name', 'descending'] },
                function(err, documents) {
    users = users.map(function(u) {
      return { name: u.name, email: u.email };
    });
    res.render('users/index.jade', {
      locals: { users: users}
    });
  }).all();
};

*/