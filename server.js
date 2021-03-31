// adding basic node file
const express = require("express");

const bodyParser = require("body-parser");
// var dateFormat = require('dateformat');

const app = express();
app.set("port", 3001);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
  host: "localhost",
  user: "postgres", // add user when we have database
  password: "",
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

app.post("/login", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const query = "SELECT password from users where username = $1";
    const result = await pool.query(query, [username]);
    console.log(result.rows);
    if (result.rowCount == 1) {
      console.log(result.rows[0].password);
      if (result.rows[0] === password) {
        console.log("Log In successful");
      } else {
        console.log("Password incorrect");
      }
    } else {
      console.log("username not found");
    }
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}`);
});
