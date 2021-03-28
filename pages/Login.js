import Link from "next/link";
import { useState } from "react";
import { loginUser } from "../lib/utils";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);

  async function handleLogin() {
    try {
      const user = await loginUser(username, password);
      console.log(user);
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
        <p> Username: </p>
        <input
          type="text"
          id="fname"
          name="fname"
          onChange={e => setUsername(e.target.value)}
        />
        <p> Password: </p>
        <input
          type="password"
          id="fname"
          name="fname"
          onChange={e => setPassword(e.target.value)}
        />

        <br />
        <br />

        <Link href="/Login">
          <button onClick={() => handleLogin()}>Sign In</button>
        </Link>
      </div>
    </div>
  );
}
