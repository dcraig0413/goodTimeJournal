import { useEffect, useState } from "react";
import { loginUser, getUser } from "../lib/utils";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
import Homepage from "./tempHomepage.js";
import Router from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidUser, setValidUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   if (isValidUser === true) {
  //     console.log(getUser(username));
  //   } else {
  //     setLoggedInUser(null);
  //   }
  // }, [isValidUser]);

  useEffect(() => {
    if (isValidUser) {
      Router.push("/tempHomepage");
    } else {
      Router.push("/Login");
    }
  }, [isValidUser]);

  async function handleLogin() {
    setValidUser(false);
    try {
      const user = await loginUser(username, password);
      if (user) setValidUser(user.ok);
      if (user.status === 200) {
        console.log("Login Successful!");
        const temp = getUser(username);
        console.log(temp);
      } else {
        setError(true);
        setValidUser(false);
        console.log("Invalid Credentials!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return isValidUser ? (
    <Homepage user={username} />
  ) : (
    <div
      style={{
        margin: "auto auto",
        width: "90vw",
        textAlign: "center",
        background: "#6699cc",
        borderStyle: "groove",
      }}
    >
      <h1>Log In</h1>
      <div>
        <br />
        <MuiThemeProvider>
          <TextField
            style={{ marginTop: -35 }}
            id="user"
            floatingLabelText="Username"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />

          <br />

          <TextField
            error={error}
            helperText="Invalid Credentials"
            id="pass"
            floatingLabelText="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <Button
            style={{ margin: 15 }}
            variant="contained"
            onClick={() => {
              handleLogin();
            }}
          >
            Sign In
          </Button>
        </MuiThemeProvider>
      </div>
      Don't have an account?{" "}
      <Button size="small" variant="text">
        <Header />
      </Button>
    </div>
  );
}
