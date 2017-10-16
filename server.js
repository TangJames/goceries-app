// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// app setup
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


const index = require('./routes/index.js');

app.use('/', index);


// gets homepage
app.get('/storefront', function(req, res) {
  res.render('storefront');
});










//start server
app.listen(port, function() {
  console.log('Server is listening on port 3000!');
});


