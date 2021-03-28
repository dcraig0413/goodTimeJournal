// adding basic node file
const express = require("express");
// const app = express();

const bodyParser = require("body-parser");
// var dateFormat = require('dateformat');

const app = express();
app.set("port", 3001);

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
  host: "localhost",
  user: "", // add user when we have database
  password: "",
  database: "",
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
    const template =
      "DELETE FROM OUR_TABLE_NAME WHERE username=$1 AND password=$2"; // add table
    const response = await pool.query(template, [username, password]);
    res.json({ status: "deleted" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const template = "SELECT * FROM users WHERE username=$1 AND password=$2";
    const response = await pool.query(template, [username, password]);
    if (response) {
      res.json("success");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(app.get("port"), () => {
  console.log('Server at: http://localhost:${app.get("port")}/');
});
