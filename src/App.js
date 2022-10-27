import './App.css';
import {Link} from 'react-router-dom'
import React, {useRef,useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'
import { collection, doc, getDocs,getFirestore, setDoc } from "firebase/firestore"
import { Head } from "./Head"
import { Side } from "./Side"
import { Chat } from "./Chat"
import { Send } from "./Send"





function App() {
  const [name,setName] =useState('')
  const [isAdd,setIsAdd]= useState(false)
  const [url,setUrl] = useState('')
  const [uid,setUid] = useState('')
  const [topic,setTopic] = useState('Introduction')
  const topic_value=useRef("Introduction");
  onAuthStateChanged(auth, user => {
    if (user) {
      setUrl(user.photoURL)
      setName(user.email.split('@')[0])
      setUid(user.uid)
      
    }
  })

  console.log(topic_value)
  
  return (
    <div className="App">
      <Head
       name={name}
       url={url}
       setUrl={setUrl}/>
      <Side 
       name={name}
       isAdd={isAdd}
       setTopic={setTopic}
       topic = {topic}
       setIsAdd={setIsAdd}
       topic_value={topic_value}
      /> 
      <Chat 
      url = {url}
      name= {name}
      topic= {topic_value.current}/>
      <Send
       name={name}
       url={url}
       uid={uid}
       topic={topic_value.current}
        />
    </div>
  );
  }



export default App;
