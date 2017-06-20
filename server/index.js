var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var queries = require('../database-mysql/queryDB');
// var items = require('../database-mongo');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/signup', (req, res) => {

  queries.addUser(req.body.username)
    .then(results => {
      return queries.selectUser(req.body.username);
    })
    .then(results => {
      res.send(JSON.stringify(results[0]));
    })
    .catch(() => {
      res.status(500).end();
      // res.send(JSON.stringify({message: 'username not Added'}))
    });
});

app.post('/addTopic', (req, res) => {

  queries.addTopic(req.body.topic)
    .then(results => {
      return queries.selectAllFromTable('topics');
    })
    .then(results => {
      res.send(JSON.stringify(results));
    })
    .catch(() => {
      res.status(500).end();
      // res.send(JSON.stringify({message: 'username not Added'}))
    });
});

app.get('/getTopics', (req, res) => {

  queries.selectAllFromTable('topics')
    .then(results => {
      res.send(JSON.stringify(results));
    })
});

app.get('/login', (req, res) => {


  queries.selectUser(req.query.username)
    .then(results => {
      if(!results.length) {
        throw results;
      }

      // get the user data
      res.send(JSON.stringify(results[0]));
    })
    .catch(noUser => {
      res.send(JSON.stringify({}));
      // console.log('This is an error', err);
    });


});

app.get('/users', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

