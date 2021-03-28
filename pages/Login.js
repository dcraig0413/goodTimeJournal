import Link from "next/link";
export default function SignUp() {
  const handleError = () => {
    alert("invalid creditentials");
  };

  return (
    <div
      style={{
        margin: "auto auto",
        width: "800px",
        textAlign: "center",
        background: "#daf6db",
        borderStyle: "groove",
      }}
    >
      <h1>Sign In</h1>
      <div>
        <p> Username: </p>
        <input type="text" id="fname" name="fname" />
        <p> Password: </p>
        <input type="password" id="fname" name="fname" />

        <br></br>

        <Link href="/Login">
          <button onClick={() => handleError()}>Sign In</button>
        </Link>
        <p>test </p>
      </div>
    </div>
  );
}
