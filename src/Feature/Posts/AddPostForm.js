import React, { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "../Posts/postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const onAuthorChanged = e => setUserId(e.target.value);

  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const cansave = Boolean(title) && Boolean(content) && Boolean(useId);

  return (
    <section>
      <h2>Add New Post </h2>
      <form>
        <label htmlFor="postTitle">Post Tiltle</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author :</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Post Content</label>
        <textarea
          name="postContent"
          id="postContent"
          cols="20"
          rows="5"
          value={content}
          onChange={onContentChanged}
        ></textarea>
        <button
          type="button"
          onClick={() => onSavePostClicked()}
          disabled={!cansave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
