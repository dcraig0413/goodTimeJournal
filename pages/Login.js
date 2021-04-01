import { useEffect, useState } from "react";
import { loginUser } from "../lib/utils";
import Button from "@material-ui/core/Button";
import { TextField } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";
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
