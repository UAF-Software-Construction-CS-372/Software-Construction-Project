const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = 8080;
const app = express();
const mongo_uri = "mongodb://localhost:27017";

var parser = bodyParser.urlencoded({ extended: false });

async function connect_to_db() {
  let mongoClient;

  try {
      mongoClient = new MongoClient(mongo_uri);
      console.log('Connecting to MongoDB...');
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB!');

      return mongoClient;
  } catch (error) {
      console.error('Connection to MongoDB failed!', error);
      process.exit();
  }
}

app.use(express.static("public"));

app.post('/login', parser, async (req, res) => {
  console.log('req.body:' + JSON.stringify(req.body));

  let client;

  try {
    client = await connect_to_db();
    const db = client.db('movies');
    const users = db.collection('users');

    // Check if user already exists
    const found = await users.find({user: req.body.user}).toArray();
    console.log('found:' + JSON.stringify(found));
    if (found.length !== 1) {
      res.sendFile(__dirname + '/public/loginfailure.html');
      return;
    }

    const user = found[0];

    if (user.pass !== req.body.pass) {
      if (user.incorrects > 1) {
        await users.updateOne({user: user.user}, {$set: {incorrects: user.incorrects - 1}});
      } else {
        await users.deleteOne({user: user.user});
      }
      res.sendFile(__dirname + '/public/loginfailure.html');
      return;
    }
    console.log('user:' + JSON.stringify(user));

    res.sendFile(__dirname + '/public/signupsuccess.html');
  } finally {
    console.log('Closing client!');
    await client.close();
  }
});

app.post('/signup', parser, async (req, res) => {

  let client;

  try {
    client = await connect_to_db();
    const db = client.db('movies');
    const users = db.collection('users');

    // Check if user already exists
    const found = users.find({user: req.body.user}).toArray();
    if (found.length === 0) {
      res.sendFile(__dirname + '/public/signupfailure.html');
      return;
    }

    // Create new user
    const new_user = {
      user: req.body.user,
      pass: req.body.pass,
      incorrects: 5
    };

    // Push user to database
    await users.insertOne(new_user);

    // Push new user to database
  } finally {
    await client.close();
    res.sendFile(__dirname + '/public/signupsuccess.html');
  }
});

app.listen(port, async () => {

  console.log(`Server running on port ${port}`);
});