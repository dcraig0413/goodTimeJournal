import Link from "next/link";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default function Homepage() {
  return (
    <MuiThemeProvider>
      <div
        style={{
          margin: "auto auto",
          width: "800px",
          textAlign: "center",
          background: "#6699cc",
          borderStyle: "groove",
          padding: "15px",
        }}
      >
        <h1>Welcome to the Fake Homepage!</h1>
        <h3>(currently to "log out", just refresh the page.)</h3>
        <br />
        <br />
        <Link href="/">Go back to the menu</Link>
      </div>
    </MuiThemeProvider>
  );
}
