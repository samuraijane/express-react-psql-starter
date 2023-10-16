require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const path = require('path');
const pgp = require('pg-promise')();

const server = express();

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,  
  PORT
} = process.env;

const cn = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  allowExitOnIdle: true
};

const db = pgp(cn);

server.use(express.json());
server.use(express.static(path.resolve(`${__dirname}/react-ui/build`)));

server.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  })
});

// TODO
//   delete this endpoint before deploying as it exists for demo purposes only;
//   not deleting this endpoint puts the database at risk.
server.get('/users', async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
});

// delegate client-side routing to the client
server.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/react-ui/build/index.html)`));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
})