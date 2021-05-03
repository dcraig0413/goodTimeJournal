require("isomorphic-fetch");

function getPosts(id) {
  return fetch(`http://localhost:3001/getEntry?q=${id}`).then(function (resp) {
    return resp.json();
  });
}

function handleError(error) {
  console.warn(error);
  return null;
}

module.exports = {
  getInfo: function (id) {
    return getPosts(id).catch(handleError);
  },
};
