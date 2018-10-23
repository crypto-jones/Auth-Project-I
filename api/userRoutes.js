const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const db = require('../data/dbConfig.js');
const router = express.Router();

// router.use(session());

router.post('/register/', (req, res) => {
  const credentials = req.body;
  console.log(credentials);
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  console.log(hash);

  db('users')
    .insert(credentials)
    .then(ids => {
      console.log('then');
      const id = ids[0];
      user.username;
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      console.log('catch');
      res.status(500).json(err);
    });
});
module.exports = router;
