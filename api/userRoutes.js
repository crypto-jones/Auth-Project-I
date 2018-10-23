const express = require('express');
const bcrypt = require('bcryptjs');

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
      console.log('then');
      const id = ids[0];
      // user.username;
      res.status(201).json({ newUserId: id });
    })
    .catch(err => {
      console.log('catch');
      res.status(500).json(err);
    });
});

// USER LOGIN
// router.post('/', (req, res) => {
//   const credentials = req.body;

//   db('users')
//     .where({ username: credentials.username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(creds.password, user.password)) {
//         req.session.username = username;
//       }
//     });
// });

module.exports = router;
