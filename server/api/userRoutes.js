const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('../data/dbConfig.js');

const router = express.Router();

// REGISTER USER
router.post('/register/', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// USER LOGIN
router.post('/login', (req, res) => {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ welcome: user.username });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// USER LOGOUT
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('There was an error logging you out.');
      } else {
        res.send('Good bye');
      }
    });
  }
});

// GET ALL USERS - AUTH PROTECTED ROUTE
router.get('/users', protected, (req, res) => {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function protected(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = router;
