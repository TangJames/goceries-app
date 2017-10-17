const User = require('../models/user');

function getSignupPage(req, res) {
  res.render(''); //TODO signup page goes here
}
//THIS ADDS NEW USERR
function registerNewUser(req, res) {
  console.log('registerNewUser');
  User.createSecure(req.body.email, req.body.password, function(err, savedUser) {
    if (err) {
      res.status(500).send('Something went wrong adding new user');
    } else {
      res.json(savedUser);
    }
  });
}
//THIS GETS LOGIN PAGE
function getLoginPage(req, res) {
  console.log('login');
  res.render('login');
}
//THIS AUTHENTICATES CURRENT USERS
function newLoginSession(req, res) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      res.status(400).send(`Error processing login: ${err.message}`);
    } else {
      res.json(user);
    }
  });
}

// export
module.exports = {
  getSignupPage: getSignupPage,
  registerNewUser: registerNewUser,
  getLoginPage: getLoginPage,
  newLoginSession: newLoginSession
}
