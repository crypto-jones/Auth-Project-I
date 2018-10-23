const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// Sanity Check Route
server.get('/', (req, res) => {
  res.send('Server is alive!');
});

const PORT = process.env.PORT || 5300;

server.listen(PORT, () =>
  console.log(`\n=== API listening on http://localhost:${PORT} === \n`)
);
