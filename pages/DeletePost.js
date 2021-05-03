import React, { useState } from "react";
import { deleteEntry } from "../lib/utils";

function DeletePost() {
  const [id, setId] = useState("");

  function handleUpdate(evt) {
    setId(evt.target.value);
  }

  async function handleDelete(evt) {
    console.log(id);
    await deleteEntry(id);
    alert("Deleted!");
  }

  return (
    <div>
      <h4>Enter post id to delete:</h4>
      <p>
        <input type="text" value={id} onChange={handleUpdate} />
      </p>
      <button className="button-style" onClick={handleDelete}>
        Delete Post
      </button>
    </div>
  );
}

export default DeletePost;
