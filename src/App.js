import { useState } from 'react';
import './App.css';
import Profile from './profile';

function App() {
const[message, setMessage]=useState("");
  function onClick(){
    // alert("done");
    setMessage("done");
  }
  return (
    <div>
      <h1>Create simple UI - Day 1</h1>
     <Profile fullname="Fahim Rahimi" username="fahim11"/>
     <button onClick={onClick}>Click</button>
     <button onClick={()=> setMessage("clicked")}>click button</button>
     <p>{message}</p>
    </div>
  );
}

export default App;
