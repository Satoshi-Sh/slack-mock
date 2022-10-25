import './App.css';
import {Link} from 'react-router-dom'
import React, {useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'
import { collection, doc, getDocs,getFirestore, setDoc } from "firebase/firestore"
import { Head } from "./Head"
import { Side } from "./Side"





function App() {
  const db = getFirestore()
  const [name,setName] =useState('')
  const [isAdd,setIsAdd]= useState(false)
  onAuthStateChanged(auth, user => {
    if (user) {
      setName(user.email.split('@')[0])
    } 
  })

  
  
  return (
    <div className="App">
      <Head
       name={name}/>
      <Side 
       name={name}
       isAdd={isAdd}
       setIsAdd={setIsAdd}
      /> 
    
    </div>
  );
  }



export default App;
