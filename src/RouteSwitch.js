import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from "./App";
import Auth from "./Auth"
import Auth2 from "./Auth2"
import React, {useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'

const RouteSwitch = ()=>{
   const [name,setName] =useState('')
   onAuthStateChanged(auth, user => {
    if (user) {
      setName(user.email.split('@')[0])
     } 
   })
    return (
        <BrowserRouter>
           <Routes>
             <Route path='/' element={name!='' ? <App />: <Auth />} />
             <Route path='/register' element={<Auth />}/>
             <Route path='/login' element={<Auth2 />}/>
           </Routes>
        </BrowserRouter>

    )
}

export default RouteSwitch;