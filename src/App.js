import { useState } from 'react';
import './App.css';
import Profile from './profile';

function App() {
const[message, setMessage]=useState("");
const[name, setName]=useState("");
const[input, setInput]=useState("");

function handlChange(event){
  setName(event.target.value);
}
  function onClick(){
    // alert("done");
    setMessage("done");
  }
  return (
    <div>
      <h1>Create simple UI - Day 4</h1>
     <Profile fullname="Fahim Rahimi" username="fahim11"/>
     <button onClick={onClick}>Click</button>
     <button onClick={()=> setMessage("clicked")}>click button</button>
     <p>{message}</p>
     <input type='text' onChange={handlChange} placeholder='Enter Name' />
     <input type='text' onChange={(e)=>setInput(e.target.value)} placeholder='Enter lastname' />
     <button onClick={()=>setName(input)}>click</button>
     <p>{name}</p>
    </div>
  );
}

export default App;
