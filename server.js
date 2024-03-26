const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require('cors');
const mongoose = require('mongoose');

const port = 8080;
const app = express();
const mongo_uri = "mongodb://localhost:27017/movies";

var parser = bodyParser.urlencoded({ extended: false });

const user_schema = new mongoose.Schema({
  user: {type: String, required: true, minLength: 4, lowercase: true, unique: true},
  pass: {type: String, required: true, minLength: 8},
  incorrects: {type: Number, required: true}
});

const User = mongoose.model('user', user_schema);

app.use(express.static("public"), cors({origin:'*'}));

app.post('/login', parser, async (req, res) => {
  console.log('req.body:' + JSON.stringify(req.body));

  // Check if user already exists
  const found = await User.find({user: req.body.user});
  console.log('found:' + JSON.stringify(found));
  if (found.length !== 1) {
    res.set('Content-Type', 'text/plain');
    res.send('Login fail!');
    return;
  }

  const user = found[0];

  if (user.pass !== req.body.pass) {
    if (user.incorrects > 1) {
      await User.updateOne({user: user.user}, {$set: {incorrects: user.incorrects - 1}});
    } else {
      await User.deleteOne({user: user.user});
    }
    res.set('Content-Type', 'text/plain');
    res.send('Login fail!')
    return;
  }
  console.log('user:' + JSON.stringify(user));
  res.set('Content-Type', 'text/plain');
  res.send('Login success!');
});

app.post('/signup', parser, async (req, res) => {
  console.log('Signup: ' + JSON.stringify(req.body));

  // Check if user already exists
  const found = await User.find({user: req.body.user});
  if (found.length != 0) {
    res.set('Content-Type', 'text/plain');
    res.send('Sign up fail! other ones found');
    return;
  }

  // Create new user
  const new_user = new User({
    user: req.body.user,
    pass: req.body.pass,
    incorrects: 5
  });

  // Push user to database
  await new_user.save();
  res.set('Content-Type', 'text/plain');
  res.send('Sign up success!');
});

app.listen(port, async () => {
  try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongo_uri);
      console.log('Successfully connected to MongoDB!');
  } catch (error) {
      console.error('Connection to MongoDB failed!', error);
      process.exit();
  }
    console.log(`Server running on port ${port}`);
});