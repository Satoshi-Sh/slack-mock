import './App.css';
import React, {useState,useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut} from "firebase/auth";
import {auth} from './firebase-config'
import c from './images/slack.png'
import addIcon from './images/add_icon.png'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function Auth2() {
    const navigate = useNavigate()
    const [registerEmail,setRegisterEmail] = useState("")
    const [registerPassword,setRegisterPassword] = useState("")
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [log, setLogin] = useState(false)

    onAuthStateChanged(auth, user => {
      if (user) {
        setLogin(true)
      } 
    })

    const register = async () =>{
        try {
        const user =  await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
        console.log(user)
        setLogin(true)
        navigate('/')
        } catch(error) {
          console.log(error.message);
          const message = document.querySelector('#message')
          message.innerText= error.message
          
        }

    }
    const login = async ()=>{
      try {
        const user =  await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
        setLogin(true)
        navigate('/')
        } catch(error) {
          console.log(error.message);
          const message = document.querySelector('#message')
          message.innerText= error.message
        }
    }
    const logout = async ()=>{
    await signOut(auth)
    setLogin(false)
    }

    let buttons;
    let form1
    let form2

    if(log){

        buttons =<div className='buttons'>
      <button onClick={logout}>Sign Out</button>
      <Link to='/'>
      <button>Home</button>
      </Link>
      </div>
      }
    else {
      
      form2=
      <div className='login'>
          <h3> Login</h3>
          <input placeholder="Email..." onChange={(event)=>setLoginEmail(event.target.value)}/>
          <input type='password' placeholder="Password..." onChange={(event)=>setLoginPassword(event.target.value)}/>
          <button onClick={login}>Login</button>
      </div> 
      buttons =<div className='buttons'>
      <p>Do not have an acccount <Link to='/register'>Register</Link></p>
      </div>

    }
    
    return (
      <div className="Auth">
        <img className='logo' src={c} alt='slack logo'></img>
        <h1>Welcom to Slack Mock</h1>
        <p id='message'></p>
        {form2}
        {buttons}
            
        
      </div>
    );
  }
  
  export default Auth2;