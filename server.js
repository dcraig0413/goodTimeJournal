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

app.post("/login", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  try {
    const query = "SELECT password from users where username = $1";
    const result = await pool.query(query, [username]);
    if (result.rowCount == 1) {
      console.log(result.rows[0].password);
      if (await argon2.verify(result.rows[0].password, password)) {
        res.json("Log In successful");
      } else {
        res.json("Password incorrect");
      }
    } else {
      res.json("username not found");
    }
  } catch (err) {
    console.log("ERROR " + err);
  }
});

app.listen(app.get("port"), () => {
  console.log('Server at: http://localhost:${app.get("port")}/');
});
