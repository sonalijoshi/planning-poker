var mongoose = require('mongoose');

var User = new mongoose.Schema({
    name     : String
  , email    : String
});

mongoose.model('User', User);

exports.User = function(db) {
  return db.model('User');
};