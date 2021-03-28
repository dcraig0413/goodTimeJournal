//[label /pages/index.js]
import Link from "next/link";
import React, { useState } from "react";

export default function () {
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
      <div style={{ padding: "10px" }}>Good Time Journal HomeScreen</div>
      <div>
        <div>
          <Link href="/SignUp">
            <button style={{ margin: "10px" }}>Sign Up</button>
          </Link>

          <Link href="/Delete">
            <button style={{ margin: "10px" }}>Delete</button>
          </Link>

          <Link href="/Login">
            <button style={{ margin: "10px" }}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
