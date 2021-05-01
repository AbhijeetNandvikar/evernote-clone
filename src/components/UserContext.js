import React from "react";
import { checkFirebaseAuth, fireStoreRef } from "../firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useState, useEffect } from "react";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const globalStore = React.createContext(null);

export const UserContext = (props) => {
  const [auth, setAuth] = React.useState(null);
  let history = useHistory();
  console.log(history);

  let width = useCurrentWidth();

  const redirect = (location) => {
    history.push(location);
  };
  const reject = () => {
    setAuth(null);
    redirect("/login");
  };
  const resolve = (data) => {
    console.log(data);
    fireStoreRef()
      .collection("users")
      .doc(data.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setAuth(doc.data());
        } else {
          fireStoreRef()
            .collection("users")
            .doc(data.uid)
            .set({
              name: data.displayName,
              email: data.email,
              photoUrl: data.photoURL,
              emailVerified: data.emailVerified,
              uid: data.uid,
            })
            .then(() => {
              setAuth({
                name: data.displayName,
                email: data.email,
                photoUrl: data.photoURL,
                emailVerified: data.emailVerified,
                uid: data.uid,
              });
            })
            .catch(() => {
              console.log("UNABLE TO CREATE NEW USER");
            });
        }
      });

    // redirect("/feed");
  };

  console.log(auth);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("user signed in");
        resolve(firebase.auth().currentUser);
        redirect("/");
      } else {
        // No user is signed in
        reject();
        console.log("user logged out");
      }
    });

    if (auth !== null) {
      fireStoreRef()
        .collection("user")
        .doc(auth.uid)
        .onSnapshot((doc) => {
          setAuth(doc.data());
        });
    }
  }, []);

  // React.useEffect(() => {

  // }, []);

  return (
    <globalStore.Provider value={{ auth, setAuth, width }}>
      {props.children}
    </globalStore.Provider>
  );
};

function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth());
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}
