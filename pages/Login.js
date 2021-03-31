import Link from "next/link";
import { useState } from "react";
import { loginUser } from "../lib/utils";
import Button from "@material-ui/core/Button";
import { TextField } from "material-ui";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../components/Header";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);

  async function handleLogin() {
    try {
      await loginUser(username, password);
      alert("Login succesful");
      setValidUser(true);
    } catch (err) {
      alert(err + ": Invalid Login Information!");
    }
  }

  return (
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
        <MuiThemeProvider>
          Username
          <br />
          <TextField
            id="user"
            variant="filled"
            label="Username"
            type="text"
            borderStyle=""
            onChange={e => setUsername(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleLogin();
                e.preventDefault();
              }
            }}
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
              onKeyPress={e => {
                if (e.key === "Enter") {
                  handleLogin();
                  e.preventDefault();
                }
              }}
            />
          </form>
        </MuiThemeProvider>

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
      or <Header />
    </div>
  );
}
