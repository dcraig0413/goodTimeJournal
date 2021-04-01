import { useEffect, useState } from "react";
import { loginUser } from "../lib/utils";
import Button from "@material-ui/core/Button";
import { TextField } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
import Homepage from "./tempHomepage";
import Router from "next/router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    if (validUser) {
      Router.push("/tempHomepage");
    }
  });

  async function handleLogin() {
    setValidUser(false);
    try {
      setValidUser(await (await loginUser(username, password)).ok);
      if (validUser === true) {
        console.log("Login Successful!");
      } else {
        console.log("Invalid Credentials!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MuiThemeProvider>
      <div
        style={{
          margin: "auto auto",
          width: "800px",
          textAlign: "center",
          background: "#6699cc",
          borderStyle: "groove",
        }}
      >
        <h1>Log In</h1>
        <div>
          Username
          <br />
          <TextField
            id="user"
            variant="filled"
            label="Username"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
          <form style={{ margin: 20 }}>
            Password
            <br />
            <TextField
              id="pass"
              variant="outlined"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </form>
          <Button
            style={{ margin: 15 }}
            variant="contained"
            onClick={() => {
              handleLogin();
            }}
          >
            Sign In
          </Button>
        </div>
        or{" "}
        <Button size="small" variant="text">
          <Header />
        </Button>
      </div>
    </MuiThemeProvider>
  );
}
