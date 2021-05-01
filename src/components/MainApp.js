import React from "react";
import { fireStoreRef } from "../firebase";
import EditorWrapper from "./EditorWrapper";
import Sidebar from "./Sidebar";
import { globalStore } from "./UserContext";

const MainApp = () => {
  const { auth, setAuth } = React.useContext(globalStore);
  const [notes, setNotes] = React.useState([]);
  const [currentNote, setCurrentNote] = React.useState(null);
  React.useEffect(() => {
    let ref = null;
    if (auth !== null) {
      ref = fireStoreRef()
        .collection("users")
        .doc(auth.uid)
        .collection("notes")
        .onSnapshot((snapshot) => {
          let notesArr = [];
          snapshot.forEach((doc) => {
            notesArr.push(doc.data());
          });
          setNotes(notesArr);
          if (notesArr.length && currentNote === null) {
            setCurrentNote(notesArr[0]);
          }
        });
    }

    return ref;
  }, [auth]);

  console.log(notes);
  return (
    <div className="flex h-screen items-center justify-center">
      {auth !== null ? (
        <div className="w-full h-full flex">
          <Sidebar
            notes={notes}
            auth={auth}
            setNotes={(val) => setNotes(val)}
            currentNote={currentNote}
            setCurrentNote={(val) => setCurrentNote(val)}
          />
          {currentNote !== null ? (
            <EditorWrapper currentNote={currentNote} />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 class="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p class="w-1/3 text-center text-white">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainApp;
