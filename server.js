// dependencies
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// app setup
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
