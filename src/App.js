import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import SignIn from "./components/Auth/SignIn";
import SignOut from "./components/Auth/SignOut";
import ChatRoom from "./components/Chat/ChatRoom";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MESSAGING,
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user, setAuth] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? (
          <ChatRoom firestore={firestore} auth={auth} />
        ) : (
          <SignIn auth={auth} />
        )}
      </section>
    </div>
  );
}

export default App;
