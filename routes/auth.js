const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const database = require('../config/database');

var secret = "mypos-backend-app";

var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// route 'authentication/*'
router.use((req, res, next) => {
  next();
});

router.post("/login", urlencodedParser, async (req, res) => {
  try {
    // Get user input
    const {
      username,
      password
    } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.json({
        login: 0,
        message: "All inputs required"
      });
    }

    //Encrypt user password
    encryptedPassword = md5(password);

    // check if user already exist
    // Validate if user exist in our database
    if (!findUser(username, encryptedPassword)) {
      res.json({
        login: 0,
        message: "User not available"
      });
    }

    // Create token
    var token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      username,
      password: encryptedPassword
    }, secret);

    /* jwt.verify(token, secret, function (err, decoded) {
      console.log(decoded);
    }); */

    // return new user
    res.json({
      login: 1,
      token
    });
  } catch (err) {
    console.log(err);
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, secret);
    //console.log(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

module.exports = {
  router,
  verifyToken
};

var users = [{
  'username': 'indunil',
  'password': '202cb962ac59075b964b07152d234b70'
}];

function findUser(username, password) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      if (users[i].password == password) {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }
}