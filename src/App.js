import './App.css';
import {Link} from 'react-router-dom'
import React, {useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'
import { collection, doc, getDocs,getFirestore, setDoc } from "firebase/firestore"
import { Head } from "./Head"
import { Side } from "./Side"





function App() {
  const [name,setName] =useState('')
  const [isAdd,setIsAdd]= useState(false)
  const [url,setUrl] = useState('')
  onAuthStateChanged(auth, user => {
    console.log(user)
    if (user) {
      setUrl(user.photoURL)
      setName(user.email.split('@')[0])
      
    }
  })

  
  
  return (
    <div className="App">
      <Head
       name={name}
       url={url}
       setUrl={setUrl}/>
      <Side 
       name={name}
       isAdd={isAdd}
       setIsAdd={setIsAdd}
      /> 
    
    </div>
  );
  }



export default App;
