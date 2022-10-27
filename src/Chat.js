import './App.css';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'


 export function Chat (props){
  const message = ()=>{
    return (<div className='message'>
    <div className='user-div'>
    <img className='avatar' alt='avatar' src={props.url}/>
    <div className='nameTime'>
      <h3 className='user-name'>{props.name}</h3>
      <h4 className='time'>12:00</h4>
    </div>
    </div>
    <div className='message-content'>
      <p>Hello! This is Satoshi. I'm checking the design of chat page at the moment.</p>
    </div>
  </div>)
  }
    return (
<div className='chat'>
  {message()}
</div>
)
    }