const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static("public"));

app.post('/login', (req, res) => {
  console.log('req.body:' + JSON.stringify(req.body));
  fs.readFile(`${req.body.user}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.sendFile(__dirname + '/public/failure.html');
    } else {
      let d = JSON.parse(data);
      console.log('data:' + JSON.stringify(d));

      if (d.pass === req.body.pass) {
        res.sendFile(__dirname + '/public/success.html');
      } else {
        console.log(d.pass + '!=' + req.body.pass);
        if (d.incorrects > 1) {
          var f = {user: d.user, pass: d.pass, incorrects: d.incorrects - 1};
          fs.writeFile(`${d.user}.json`, JSON.stringify(f), (err) => {
            console.log(err);
          });
        } else {
          fs.rmSync(`${d.user}.json`, {
            force: true,
          });
        }
        
        res.sendFile(__dirname + '/public/failure.html');
      }
    }
  });
});

app.post('/signup', (req, res) => {
  console.log(`${req.body.user} ${req.body.pass}.`);
  var f = {user: req.body.user, pass: req.body.pass, incorrects: 5};
  fs.writeFile(`${req.body.user}.json`, JSON.stringify(f), (err) => {
    console.log(err);
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});