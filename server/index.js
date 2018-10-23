const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const userRoutes = require('./api/userRoutes');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// Session Setup
server.use(
  session({
    name: 'auth-practice',
    secret: 'lisa needs braces',
    httpOnly: true,
    resave: false,
    saveUninitalized: false, // obey the law!
    cookie: {
      secure: false, // true for https
      maxAge: 1000 * 60 * 10 // 10 minutes
    },
    store: new KnexSessionStore({
      tablename: 'sessions',
      sidfieldname: 'sid',
      knex: db,
      createTable: true,
      clearInterval: 1000 * 60 * 60 // removes only expired sessions
    })
  })
);

// Sanity Check Route
server.get('/', (req, res) => {
  res.send('Server is alive!');
});

server.use('/api', userRoutes);

const PORT = process.env.PORT || 5300;

server.listen(PORT, () =>
  console.log(`\n=== API listening on http://localhost:${PORT} === \n`)
);
