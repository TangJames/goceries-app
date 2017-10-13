// dependencies
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// app setup
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.json());

// app routes
// app.get('/', function() {
//   res.send('THIS IS WORKING');
// });

//start server
app.listen(3000, function() {
  console.log('Server is listening on port 3000!')
});
=======

app.set('view engine', 'ejs');
app.use(bodyParser.json());

