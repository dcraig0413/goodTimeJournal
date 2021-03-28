import Link from "next/link";

export default function SignUp() {
  const handleError = () => {
    alert("Invalid Login Information!");
  };

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
        <input type="text" id="fname" name="fname" />
        <p> Password: </p>
        <input type="password" id="fname" name="fname" />

        <br />
        <br />

        <Link href="/Login">
          <button onClick={() => handleError()}>Sign In</button>
        </Link>
      </div>
    </div>
  );
}
