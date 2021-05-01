import React from "react";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import { fireStoreRef } from "../firebase";

const EditorWrapper = (props) => {
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    setContent(props.currentNote.content);
    setTitle(props.currentNote.title);
  }, [props.currentNote]);
  return (
    <div className="flex flex-col w-full h-screen overflow-auto ">
      <div className="flex">
        <input
          className="text-2xl text-gray-900 px-4 py-4 outline-none border-b-2 border-gray-900 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-gray-900 text-white rounded w-32 font-bold outline-none ">
          Save
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
