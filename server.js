require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const path = require("path");
const pgp = require("pg-promise")();

const server = express();

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
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

if (NODE_ENV === "development") {
  server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
  });
}

server.use(express.json());
server.use(express.static(path.resolve(`${__dirname}/react-ui/build`)));

server.get("/heartbeat", (req, res) => {
  res.json({
    "is": "working"
  })
});

// TODO
//   delete this endpoint before deploying as it exists for demo purposes only;
//   not deleting this endpoint puts the database at risk.
server.get("/users", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
});

server.post("/signup", async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    password
  } = req.body;

  try {
    const newuser = await db.query(`
      INSERT INTO users (last_name, first_name, email, pw_hash, created_at, updated_at) VALUES
      ('${lastname}', '${firstname}', '${email}', '${password}', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
      ON CONFLICT (email) DO NOTHING
      RETURNING email;
    `);
    
    if (!newuser.length) {
      res.json({
        isSuccess: false,
        message: "This email is already registered."
      });
    } else if (newuser[0].email === email) {
      res.json({
        isSuccess: true,
        message: `User with email ${email} has been successfully registered.`
      });
    } else {
      throw new Error("Something went wrong.");
    }
  } catch (error) {
    res.json({ error });
  }
});

// delegate client-side routing to the client
server.get("*", (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/react-ui/build/index.html)`));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running in a ${NODE_ENV} environment and listening at port ${PORT}`);
});
