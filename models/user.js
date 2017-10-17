const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String
});


UserSchema.statics.createSecure = function(email, password, callback) {
  const UserModel = this;

  bcrypt.genSalt(function(err, salt) {
    // console.log(`Here's my salt! ${salt}`);
    bcrypt.hash(password, salt, function(err, hash) {
      UserModel.create({
        email: email,
        passwordHash: hash
      }, callback);
    });
  });
};

UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, callback);
};

UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({
    email,
  }, function(err, foundUser) {
    if (!foundUser) {
      callback(new Error(`Could not find user with email: ${email}`), null);
    } else {
      foundUser.checkPassword(password, function(err, passwordsMatch) {
        if (err || !passwordsMatch) {
          callback(new Error('Passwords did not match'), null);
        } else {
          callback(null, foundUser);
        }
      });
    }
  });
};

const User = mongoose.model('User', UserSchema);

// export
module.exports = User;
