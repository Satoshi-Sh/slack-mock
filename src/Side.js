import './App.css';
import { Link } from 'react-router-dom'
import React, {useState,useEffect} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase-config'
import { collection, doc, getDocs,getFirestore, setDoc } from "firebase/firestore"

export function Side (props){
    const db = getFirestore()

    function changeTopic(string){
      props.topic_value.current=string
      console.log(string)
    }
    

    async function getDocuments(db,list){
        const querySnapshot = await getDocs(collection(db,"topics"));
        if (list?.innerHTML==''){
        querySnapshot.forEach((doc) => {
          let li = document.createElement('li')
          li.className='topic';
          li.innerHTML = `#${doc.id}`
          list.insertBefore(li,list.firstChild)
        }); 
      }
    
    }

  useEffect((props)=>{
    const list = document.querySelector('.topic-list')
    if (props?.name!==''){
    getDocuments(db,list)
    }
  },[props.name,props.isAdd])

  if (props?.name!==''){
    function showInput (){
    const input = document.querySelector('.add-input-div')
    const add = document.querySelector('.add')
    input.style.display='flex'
    add.style.display='none'
    }
    function cancel (){
      const input = document.querySelector('.add-input-div')
    const add = document.querySelector('.add')
    input.style.display='none'
    add.style.display='block'
    }
    async function submit(){
      const addInput = document.querySelector('.add-input')
      const text = addInput.value;
      await setDoc(doc(db,'topics',text),{
  
      })
      addInput.value=''
      props.setIsAdd(true)
      const list = document.querySelector('.topic-list')
      list.innerHTML=''
      getDocuments(db,list)
      cancel()
  
    }

return (
<div className='topics'>
       <ul className='topic-list' onClick={(e)=>changeTopic(e.target.innerText.slice(1,))}>
       </ul>
       <div className='add-div'>
       <div className='add-input-div' style={{display:'none'}}> 
        <input className='add-input' placeholder='new topic...' type='text'/>
        <button className='green' onClick={submit} >Add</button>
        <button className='red' onClick={cancel}>Cancel</button>
       </div>
       <button className='add' onClick={showInput}>+</button>
       </div>
    </div>   )
  }}