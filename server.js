const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


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

const movie_schema = new mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  link: {type: String, required: true},
  ratings: {type: Array, required: false},
  feedback: {type: String, required: false},
  comments: {type: Array, required: false},
});

const Movie = mongoose.model('movie', movie_schema);

app.use(express.static("public"), cors({origin:'*'}));

app.post('/login', parser, async (req, res) => {
  // Check if user already exists
  const found = await User.find({user: req.body.user});
  if (found.length !== 1) {
    res.status(400).json({success: false}).send();
    return;
  }

  const user = found[0];

  if (user.pass !== req.body.pass) {
    if (user.incorrects > 1) {
      await User.updateOne({user: user.user}, {$set: {incorrects: user.incorrects - 1}});
      res.status(400).json({success: false, message: `Login failed! ${user.incorrects - 1} tries left!`}).send();
    } else {
      await User.deleteOne({user: user.user});
      res.status(400).json({success: false, message: `Login failed! User ${req.body.username} deleted!`}).send();
    }
    return;
  }
  res.status(200).sendFile(__dirname + '/public/search.html');
});

app.post('/signup', parser, async (req, res) => {
  // Check if user already exists
  const found = await User.find({user: req.body.user});
  if (found.length != 0) {
    res.status(400).json({success: false, message: `Other user with name ${req.body.user} found!`}).send();
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
  res.status(200).json({success: true}).send();
});

app.post('/movie-add', parser, async (req, res) => {
    console.log(`Recieved movie creation request: ${JSON.stringify(req.body)}`)

    // Check if movie already exists
    const found = await Movie.find({title: req.body.title});
    if (found.length != 0) {
      res.status(400).json({success: false, message: `Skill issue: ${req.body.title} exists!`}).send();
      return;
    }
  
    // Create new user
    const new_movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      link: req.body.link,
    });
  
    // Push user to database
    await new_movie.save();
    res.status(200).json({success: true, message: `Movie ${req.body.title} added!`}).send();
});

app.post('/movie-delete', parser, async (req, res) => {
  console.log(`Recieved movie deletion request: ${JSON.stringify(req.body)}`)
  Movie.deleteOne({title: req.body.title});
  res.status(200).json({success: true, message: `Movie ${req.body.title} deleted!`}).send();
});

app.get('/add', parser , async (req, res) => {
  res.sendFile(__dirname + '/public/movies_control/control_movies.html');
});

app.post('/play-movie', parser, async (req, res) => {
  // Verify we have the movie
  const found = await Movie.find({title: req.body.title});
  if (found.length == 0) {
    res.status(400).json({success: false, message: `Skill issue: ${req.body.title} does not exist!`}).send();
    return;
  }

  fs.readFile('public/moviePlayer.html', 'utf8', async (err, data) => {
      if (err) {
          console.error(err);
          res.status(400).json({ success: false, message: 'An error occurred while loading a file.'}).send();
          return;
      }

      const dom = new JSDOM(data);
      const video = dom.window.document.querySelector('#player');

      // Get movie link
      const link = found[0].link;

      // Set the src attribute of the video element
      video.setAttribute('src', link);

      // Send the modified HTML
      res.send(dom.serialize());
  });
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
