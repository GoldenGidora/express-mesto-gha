const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/users'));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
