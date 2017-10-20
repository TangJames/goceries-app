// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// app setup
const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'thisAppRulesDoesntIt',
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minute cookie lifespan (in milliseconds)
}));

const index = require('./routes/index.js');

app.use('/', index);


//start server
app.listen(port, function() {
  console.log('Server is listening on port 3000!');
});
