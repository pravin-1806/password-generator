import React from 'react';
import './Style.css';
import { useState,useCallback,useEffect,useRef } from 'react';

function Dash() {
    const [length,setLength]=useState(8);
    const [numberAllowed,setNumberAllowed]=useState(false);
    const [splCharAllowed,setSplCharAllowed]=useState(false);
    const [password,setPassword]=useState('');
    const passwordRef=useRef(null);

    const generatePassword=useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed) str+="0123456789";
      if(splCharAllowed) str+="@#$*?+";

      for(let i=1;i<=length;i++){
        let no=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(no);
      }
      setPassword(pass);
    },[length,numberAllowed,splCharAllowed]);

    useEffect(()=>{
      generatePassword();
    },[length,numberAllowed,splCharAllowed])

    const copyToClipboard= ()=>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current.select();
    }
  return (
    <div>
      <h1>Password Generator</h1>         
        <div className='container'>
        <div className='main1'>
              <input type="text" value={password} ref={passwordRef} readOnly placeholder='Password' className='disp' />
              <button onClick={copyToClipboard}>copy</button>
          </div>
          <div className='main2'>
              <input type="range" value={length} min={6} max={20} className='cursorMove' onChange={(e)=>setLength(e.target.value)} />
              <label htmlFor="length">Length : {length}</label>
          </div>
          <div className='main3'>
              <input id='01' type="checkbox" onClick={()=>setNumberAllowed((prev)=>!prev)} />
              <label htmlFor='01'>Numbers</label>
              <input id='02' type="checkbox" style={{marginLeft:'18px'}} onClick={()=>setSplCharAllowed((prev)=>!prev)} />
              <label htmlFor='02'>Special Character</label>
          </div>
        </div>
    </div>
  )
}

export default Dash
