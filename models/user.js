const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//represented as a collection of Users in the DB.
const UserSchema = new mongoose.Schema({
    gitHubAccessToken: String,
	facebookAccessToken: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

UserSchema.statics.createSecure = function(email, password, callback) {
  const UserModel = this;

  bcrypt.genSalt(function(err, salt) {
    console.log(`Here's my salt! ${salt}`);
    bcrypt.hash(password, salt, function(err, hash) {
      UserModel.create({
        email: email,
        passwordHash: hash
      }, callback);
    });
  });
};

//TODO REWRITE THIS METHOD
UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
};
//TODO REWRITE THIS METHOD
UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({email: email}, function(err, foundUser) {
    if (!foundUser) {
      callback(new Error('I couldnt find the user!'), null);
    } else {
      foundUser.checkPassword(password, function(err, passwordsMatch) {
        if (err || !passwordsMatch) {
          callback(new Error('Password did not match'), null);
        } else {
          callback(null, foundUser);
        }
      });
    }
  });
};

const User = mongoose.model('User', UserSchema);

//export
module.exports = {
	User: User
}
