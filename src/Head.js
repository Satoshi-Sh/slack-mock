import './App.css';
import React, {useState} from "react";
import { Link } from 'react-router-dom'

 export function Head (props){
  if (props?.name!=''){
    return (
<div className='header'><h1>{props.name[0].toUpperCase() + props.name.slice(1,)}</h1>
      <Link to='/auth'>
        <button>Sign Out</button>
      </Link></div>)

    }
 }
