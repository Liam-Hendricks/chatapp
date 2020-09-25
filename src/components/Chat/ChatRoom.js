import React, { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ auth, firestore }) => {
  const dummy = useRef("");
  const messageRef = firestore.collection("messages"); //accessing the collection in firestore
  //creating the query,creating the
  const query = messageRef.orderBy("createdAt").limit(25);
  //using the firebase hook to get latest messages when a new one is added to the database
  const [messages] = useCollectionData(query, { idField: "id" });
  //formValue hold the input the user is typing
  const [formValue, setFormValue] = useState("");
  //function for adding message to database
  const sendMessage = async (e) => {
    e.preventDefault(); //stop page refresh when form is submitted
    const { uid, photoURL } = auth.currentUser;
    //get the current user id and photourl
    //us the messageRef object to add new document
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              auth={auth}
              index={index}
              size={messages.length}
            />
          ))}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

ChatRoom.defaultProps = {
  auth: {},
  firestore: {},
};
ChatRoom.propTypes = {
  auth: PropTypes.object,
  firestore: PropTypes.object,
};
export default ChatRoom;
