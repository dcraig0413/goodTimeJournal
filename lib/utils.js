import "isomorphic-fetch";

export function loginUser(username, password) {
  return fetch(
    `http://localhost:3001/login?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  ).then(function (response) {
    return response;
  });
}

export async function getUser(username) {
  const response = await fetch(
    `http://localhost:3001/user-info?username=${username}`
  );
  let data = response.body;
  return response;
}

export function deleteEntry(id, u_id, validUser) {
  if (validUser) {
    return fetch(`http://localhost:3001/deleteEntry?id=${id}&user=${u_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, u_id }),
    }).then(function (response) {
      return response;
    });
  } else {
    console.log("error: validUser is false");
  }
}
