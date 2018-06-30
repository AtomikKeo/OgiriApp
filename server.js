const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//ミドルウェアの使用
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/mydb');

const Answer = mongoose.model('Answer', {
  name : String,
  text : String,
  votes : Number,
  date : {type : Date, default : Date.now}
});

const Problem = mongoose.model('Problem', {
  name : String,
  text : String,
  date : {type : Date, default : Date.now}
})

app.get('/api/answers', (req, res) =>{
  Todo.find()
      .then((answers) => {
        res.json(answers);
      })
      .catch((err) => {
        res.send(err);
      })
});

app.post('/api/answers', (req, res) => {
  const answer = req.body;
  Todo.create({
        name : answer.name,
        text : answer.text,
        date : new Date
      })
      .then((answer) => {
        res.json(answer);
      })
      .catch((err) => {
        res.send(err);
      });
});

app.delete('/api/todos/:answer_id', (req, res) => {
  Todo.remove({
        _id : req.params.answer_id
      })
      .then((answer) => {
        res.send(answer);
      })
      .catch((err) => {
        res.send(err);
      });
});

app.get('/', (req, res) => {
  res.sendfile('/public/index.html');
});

app.listen(3000, () => {
  console.log("My app listening on port 3000!");
});
