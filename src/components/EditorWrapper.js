import React from "react";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { fireStoreRef } from "../firebase";

const EditorWrapper = (props) => {
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    setContent(props.currentNote.content);
    setTitle(props.currentNote.title);
    if (
      props.currentNote.content !== content &&
      props.currentNote.title !== title
    ) {
      setUpdating(true);
    }
  }, [props.currentNote]);

  React.useEffect(() => {
    if (
      props.currentNote.content !== content ||
      props.currentNote.title !== title
    ) {
      setUpdating(true);
    } else {
      setUpdating(false);
    }
  }, [title, content]);

  const updateNote = (title, content) => {
    fireStoreRef()
      .collection("users")
      .doc(props.auth.uid)
      .collection("notes")
      .doc(props.currentNote.id)
      .update({
        ...props.currentNote,
        title: title,
        content: content,
        timestamp: Date.now(),
      })
      .then(() => {
        setUpdating(false);
      });
  };
  return (
    <div className="flex flex-col w-full h-screen overflow-auto ">
      <div className="flex">
        <input
          className="text-2xl text-gray-900 px-4 py-4 outline-none border-b-2 border-gray-900 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white rounded lg:w-60 sm:w-30 font-bold outline-none px-4"
          onClick={() => {
            updateNote(title, content);
          }}
        >
          {updating ? "Save Changes" : "Saved"}
        </button>
      </div>

      <ReactQuill
        value={content}
        onChange={(e) => {
          console.log(e);
          setContent(e);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default EditorWrapper;
