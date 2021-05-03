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
    const temp = "SELECT count FROM users WHERE username=$1";
    const resp = await pool.query(temp, [username]);
    console.log(resp.rows[0].count);
    if (resp.rows[0].count >= 10) {
      // not sure what number to put
      console.log("Account is locked!");
      res.json({ status: "Account locked!" });
    } else {
      try {
        const query = "SELECT password FROM users WHERE username = $1";
        const result = await pool.query(query, [username]);
        // console.log(results.row[0].username);
        if (result.rowCount > 0) {
          if (result.rows[0].password === password) {
            console.log("Login successful!");
            res.sendStatus(200);
            const template = "UPDATE users SET count=0 WHERE username=$1";
            const response = await pool.query(template, [username]);
          } else {
            console.log("Password incorrect!");
            res.sendStatus(401);
            const template = "UPDATE users SET count=count+1 WHERE username=$1";
            const response = await pool.query(template, [username]);
          }
        } else {
          console.log("Username not found!");
          res.sendStatus(401);
        }
      } catch (err) {
        console.log("ERROR " + err);
      }
    }
  } catch (err) {
    console.error("ERROR1 " + err);
  }
});

app.get("/user-info", async (req, res) => {
  const username = req.query.username;
  try {
    const userInfo = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    console.log(userInfo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

app.get("/getEntry", async (req, res) => {
  const id = req.query.id;

  try {
    const temp = "SELECT * FROM journalentries WHERE u_id=$1";
    const resp = await pool.query(temp, [id]);

    res.json({ status: resp.rows });
  } catch (err) {}
});

app.delete("/deleteEntry", cors(), async (req, res) => {
  const entry = req.query.id;
  const user = req.query.u_id;

  try {
    const query = "SELECT id FROM journalEntries WHERE id = $1 AND u_id = $2";
    const result = await pool.query(query, [entry, user]);
    if (result.rowCount > 0) {
      if (result.rows[0].id === journal && result.rows[0].u_id === user) {
        const deleteMutation = "DELETE FROM journalEntries WHERE id = $1";
        const deleteResult = await pool.query(deleteMutation, [entry]);
        console.log("Entry deleted.");
      } else {
        console.log("Entry could not be deleted.");
      }
    } else {
      console.log("Entry does not exist.");
    }
  } catch (err) {
    console.log("ERROR: " + err);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Server at: http://localhost:${app.get("port")}`);
});
