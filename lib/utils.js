import "isomorphic-fetch";

export function loginUser(username, password) {
  console.log("hit");
  return fetch(
    `https://localhost:3001/login?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
}
