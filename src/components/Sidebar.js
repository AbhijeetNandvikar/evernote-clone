import Interweave from "interweave";
import React from "react";
import { uuid } from "uuidv4";
import { fireStoreRef } from "../firebase";
import { logoutWrapper } from "../firebase";
import placeholder from "../images/profile-placeholder.png";

const Sidebar = (props) => {
  const [adding, setAdding] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const addNote = (title) => {
    let newUid = uuid();
    return fireStoreRef()
      .collection("users")
      .doc(props.auth.uid)
      .collection("notes")
      .doc(newUid)
      .set({
        title: title,
        content: "",
        id: newUid,
        timestamp: Date.now(),
      });
  };

  const deleteNote = (id) => {
    return fireStoreRef()
      .collection("users")
      .doc(props.auth.uid)
      .collection("notes")
      .doc(id)
      .delete();
  };

  const stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  const renderNotes = (notes) => {
    if (notes !== null) {
      return notes.map((note, i) => {
        return (
          <div
            className={
              props?.currentNote?.id === note.id
                ? `h-auto py-4 border-b-2 border-t-2 border-white my-4 `
                : "h-auto py-4"
            }
            onClick={() => {
              props.setCurrentNote(note);
            }}
          >
            <div className="flex">
              <div
                className={
                  props?.currentNote?.id === note.id
                    ? `text-xl font-bold mb-3 h-6 overflow-hidden`
                    : "text-xl mb-3"
                }
              >
                {note.title}
              </div>
              <button
                className="border-white border-2 rounded px-2 ml-auto text-xs"
                onClick={() => {
                  deleteNote(note.id);
                }}
              >
                Delete
              </button>
            </div>
            <div className="text-gray-100 mb-5 h-12 overflow-hidden">
              <Interweave content={note.content} />
            </div>
            <div className="text-xs text-gray-100">
              {new Date(parseInt(note.timestamp)).toDateString()}
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div className="flex flex-col w-96 px-5 py-4 border border-3 bg-gray-900 text-white overflow-auto">
      <button
        className="border-2 border-white rounded w-full py-3 mb-5"
        onClick={() => {
          if (adding) {
            setAdding(false);
            addNote(title).then((res) => {
              setTitle("");
            });
          } else {
            setAdding(true);
          }
        }}
      >
        {adding ? "save" : "Add New Note"}
      </button>
      {adding ? (
        <>
          <button
            className="border-2 border-white rounded w-full py-3 mb-5"
            onClick={() => {
              setTitle("");
              setAdding(false);
            }}
          >
            Cancel
          </button>
          <div className="text-lg mb-4">Title :</div>
          <input
            className=" w-64 text-xl font-bold text-gray-100 bg-gray-900 border-2 px-3 py-5 outline-none border-white rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
      <div className="mt-8 overflow-auto">{renderNotes(props.notes)}</div>
      <div className="flex items-center mt-auto mb-5">
        <img
          className="w-8 h-8 rounded-full mr-4 object-cover"
          src={props.auth.photoUrl ? props.auth.photoUrl : placeholder}
          alt="profile"
        />
        <div className="text">{props.auth.email}</div>
      </div>
      <button
        className="border-2 border-white rounded w-full py-3 mb-5"
        onClick={() => {
          logoutWrapper();
          window.location.href = "http://localhost:3000/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
