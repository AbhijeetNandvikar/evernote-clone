import React from "react";
import EditorWrapper from "./EditorWrapper";
import Sidebar from "./Sidebar";

const MainApp = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <EditorWrapper />
    </div>
  );
};

export default MainApp;
