import './App.css';
import { Link } from 'react-router-dom'
import React, {useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'
import Attach from "./images/add_icon.png"
import { updateDoc,arrayUnion,setDoc,doc,serverTimestamp,Timestamp } from 'firebase/firestore';
import { db } from './firebase-config'

export function Send(props){
    const [text,setText] =useState('')
    function changeText (e){
     setText(e.target.value)
    }
    const handleSend = async() =>{
        console.log(props.topic)
        await updateDoc(doc(db,'topics',props.topic),{
            message:arrayUnion({
                uid:props.uid,
                usernaem:props.name,
                avatar:props.url,
                message:text,
                // client time for the moment
                time: Timestamp.now()    
            })
        })
        setText("");
    }

    function sendMessage(){
        console.log({
            uid:props.uid,
            usernaem:props.name,
            avatar:props.url,
            message:text,
            // client time for the moment
            time: Timestamp.now()

        })
    }
    return(
        <div className='send'>
           <textarea
        className='message-input'
        type="text"
        placeholder="Type something..."
        onChange={(e)=>changeText(e)}
        value={text}
      />
        
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
        <img src={Attach} className='add-icon' id='add-icon2' alt="" />
        </label>
        <button className='send-button' onClick={handleSend} >Send</button>
      </div>
    )
}