// dependencies
const express = require('express');
const bodyParser = require('body-parser');

// app setup
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extedned: true}));


const index = require('./routes/index.js');

// gets login page
app.get('/login', function(req, res) {
  res.render('login')
});
// gets admin page
app.get('/admin', function(req, res) {
  res.render('admin')
});
// gets homepage
app.get('/storefront', function(req, res) {
  res.render('storefront')
});










//start server
app.listen(port, function() {
  console.log('Server is listening on port 3000!');
});
