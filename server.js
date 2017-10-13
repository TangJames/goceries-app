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

app.use('/', index);










//start server
app.listen(port, function() {
  console.log('Server is listening on port 3000!');
});


