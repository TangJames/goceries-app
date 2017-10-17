const User = require('../models/user');



// function getHomePage(req, res) {
//   User.find({}, function(err, currentUser) {
//     res.render('index', {
//       users: currentUser
//     });
//   });
// }


function getSignupPage(req, res) {
  res.render('adminSignup');
}

function getLoginPage(req, res) {
  res.render('admin');
}

function getLogoutPage(req, res) {

  req.session.userId = null;

  res.redirect('/login');
}


function getProfilePage(req, res) {
  User.findOne({
    _id: req.session.userId
  }, function(err, currentUser) {
    res.render('adminHome', {
        user: currentUser
    });
  });
}



function registerNewUser(req, res) {
  User.createSecure(req.body.email, req.body.password, function(err, savedUser) {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      req.session.userId = savedUser._id;
      res.redirect('/profile');
    }
  });
}

function newLoginSession(req, res) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      res.status(400).send(`Error processing login: ${err.message}`);
    } else {
      req.session.userId = user._id;
      res.redirect('/profile');
    }
  });
}





// export
module.exports = {
  getSignupPage,
  getLoginPage,
  registerNewUser,
  newLoginSession,
  getLogoutPage,
  getProfilePage
};
