let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let backendPort = 8084;
let mock = {
  userData: require('./mock/userData'),
  feedData: require('./mock/feedData'),
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/login', function(req, res, next) {
  let data = JSON.parse(req.body);
  let username = data.username;
  let password = data.password;
  if (username === 'srinivas' && password === '9lessons') {
    return res.status(200).json(mock.userData);
  } else {
    return res
      .status(200)
      .send('{"error":{"text":"Bad request wrong username and password"}}');
  }
});

app.post('/feed', function(req, res, next) {
  let data = JSON.parse(req.body);
  if (data.token && data.user_id === '1') {
      return res.status(200).json(mock.feedData);
  } else {
    return res.status(401).send('No Access');
  }
});

app.listen(backendPort, function() {
  console.log('Express server listening on port ' + backendPort);
});
