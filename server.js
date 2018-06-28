const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Node.js!');
});

app.listen(3000, () => {
  console.log("My app listening on port 3000!");
});
