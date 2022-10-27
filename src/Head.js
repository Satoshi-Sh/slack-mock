import './App.css';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'


 export function Head (props){
  

  
  if (props?.name!=''){
    
    return (
<div className='header'>
  <img className='profile' src={props.url ? props.url:'https://firebasestorage.googleapis.com/v0/b/slack-mock-a6c20.appspot.com/o/default.png?alt=media&token=28868d8b-d99f-474e-9332-2b685ce8ff2a'}  alt='profile'></img>
  <h1>{props.name[0].toUpperCase() + props.name.slice(1,)}</h1>
      <Link to='/login'>
        <button>Sign Out</button>
      </Link>
</div>
)
    }
  }
