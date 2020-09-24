import React,{useRef, useState} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



import {useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';



console.log({
  
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTDOMAIN ,
  databaseURL:process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
})

firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_AUTDOMAIN ,
  databaseURL:process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
  messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MESSAGING
})

const auth=firebase.auth();
const firestore=firebase.firestore();


function App() {

  const [user,setAuth]=useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom/> :<SignIn setAuth={setAuth}/>}
      </section>
    </div>
  );

  function SignIn(){
    const signInWithGoogle=()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

    return(<button onClick={signInWithGoogle}>Sign in with Google</button>)
  }

  function SignOut(){
    return auth.currentUser && (
      <button onClick={()=>auth.signOut()}> Sign Out</button>
    )
  }

  function ChatRoom(){
    const dummy =useRef('');
    const messageRef =firestore.collection('messages');//accessing the collection in firestore
    //creating the query,creating the 
    const query=messageRef.orderBy('createdAt').limit(25);
    //using the firebase hook to get latest messages when a new one is added to the database
    const [messages]=useCollectionData(query,{idField:'id'});
    //formValue hold the input the user is typing
    const [formValue,setFormValue]=useState('');
    //function for adding message to database
    const sendMessage = async(e)=>{
        e.preventDefault();//stop page refresh when form is submitted
        const {uid,photoURL}=auth.currentUser;
        //get the current user id and photourl
        //us the messageRef object to add new document
        await messageRef.add({
            text:formValue,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        setFormValue('');
        dummy.current.scrollIntoView({behavior:'smooth'});
    }
    return(
      <>
       <main>
         {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
         <div ref={dummy}>

         </div>
       </main>
       <form onSubmit={sendMessage}>
         <input value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
         <button type="submit">Send</button>
       </form>
      </>
    )
  }


  function ChatMessage(props){
      const {text,uid,photoURL}=props.message;
      const messageClass = uid === auth.currentUser.uid? 'sent':'recieved';//conditional css 
      return( 
        <div className={`message ${messageClass}`}>
          <img src={`${photoURL}`} width='5%' height='5%'/>
          <p>{text}</p>
         
        </div>
      )
  }
  
  
}

export default App;
