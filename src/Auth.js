import './App.css';
import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile} from "firebase/auth";
import {auth,db, storage} from './firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import c from './images/slack.png'
import addIcon from './images/add_icon.png'
import { setDoc,doc } from 'firebase/firestore';
import defAvatar from './images/default.png'

function Auth() {
    const navigate = useNavigate()
    const [registerEmail,setRegisterEmail] = useState("")
    const [registerPassword,setRegisterPassword] = useState("")
    const [userName,setUsername] = useState("")
    const [log, setLogin] = useState(false)

    onAuthStateChanged(auth, user => {
      if (user) {
        setLogin(true)
      } 
    })

    const register = async () =>{
              
        try {
        const res =  await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
        let file;
        if  (document.querySelector('#file').files[0]) {
          file= document.querySelector('#file').files[0]
          //create a unique image name 
        const date = new Date().getTime()
        const storageRef = ref(storage, `${userName +date}`)
        await uploadBytesResumable(storageRef, file).then(()=>{
          getDownloadURL(storageRef).then(async(downloadURL)=>{
            try {
              await updateProfile(res.user,{
                userName,
                photoURL:downloadURL,
              })
              await setDoc(doc(db,"users",res.user.uid),{
                uid:res.user.uid,
                userName,
                registerEmail,
                photoURL:downloadURL,
              })

            } catch (error){
              console.log(error);
      
            }
          })
        })
         }
         //with default picture
         else {
          try {
            await updateProfile(res.user,{
              userName,
              photoURL:'https://firebasestorage.googleapis.com/v0/b/slack-mock-a6c20.appspot.com/o/default.png?alt=media&token=28868d8b-d99f-474e-9332-2b685ce8ff2a',
            })
            await setDoc(doc(db,"users",res.user.uid),{
              uid:res.user.uid,
              userName,
              registerEmail,
              photoURL:'https://firebasestorage.googleapis.com/v0/b/slack-mock-a6c20.appspot.com/o/default.png?alt=media&token=28868d8b-d99f-474e-9332-2b685ce8ff2a',
            })

          } catch (error){
            console.log(error);
    
          }
          
         }
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

    if(log){

        buttons =<div className='buttons'>
      <button onClick={logout}>Sign Out</button>
      <Link to='/'>
      <button>Home</button>
      </Link>
      </div>
      }
    else {
      form1 = <div>
        <h3>Register User</h3>
        <p>*Please use a fake email</p>
        <div className='register'>
        <input required placeholder='Email...'  onChange={(event)=>setRegisterEmail(event.target.value)}/>
        <input required type='password' placeholder='Password...' onChange={(event)=>setRegisterPassword(event.target.value)}/>
        <input required type='text' placeholder='Username...' onChange={(event)=>setUsername(event.target.value)}></input>
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
            <img className='add-icon' src={addIcon}  alt="" />
            <span className='add-avatar'>Add an avatar</span>
          </label>
        <button onClick={register}>Create User</button>
        <p>Do have an acccount <Link to='/login'>Login</Link></p>
      </div>
        </div>
      
    }
    
    return (
      <div className="Auth">
        <img className='logo' src={c} alt='slack logo'></img>
        <h1>Welcom to Slack Mock</h1>
        <p id='message'></p>
        {form1}
        {buttons}
            
        
      </div>
    );
  }


 
  
  export default Auth;