// adding basic node file
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
// var dateFormat = require('dateformat');

const app = express();
app.set("port", 3001);
// const argon2 = require("argon2");

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Pool = require("pg").Pool;
const config = {
  host: "localhost",
  user: "postgres", // add user when we have database
  password: "postgres",
  database: "journals",
};

const pool = new Pool(config);

app.get("/", (req, res) => {
  res.json({ message: "success" });
});

// add things here
// ...

app.delete("/delete-user", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const template = "DELETE FROM users WHERE username=$1 AND password=$2"; // add table
    const response = await pool.query(template, [username, password]);
    res.json({ status: "deleted" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", cors(), async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  try {
    const query = "SELECT password FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    if (result.rowCount > 0) {
      if (result.rows[0].password === password) {
        console.log("Log In successful");
      } else {
        console.log("Password incorrect");
      }
    } else {
      console.log("Username not found");
    }
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}`);
});
