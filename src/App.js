import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const[tasks,setTasks]=useState([]);
    const[input,setInput]=useState("");

    const API_URL="https://localhost:7107/api/task";
    useEffect(()=>{
      fetch(API_URL)
      .then(res=>res.json())
      .then(data=>setTasks(data))
      .catch((err)=>console.log(err));
    },[]);

     function sendData() {
    if (input.trim() === "") return;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: input}),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setInput("");  
      })
      .catch((err) => console.log(err));
  }


  return (
   <div className="container">
        <h1>send and fetch data by API - Day 11</h1>
  

    
    
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter task"
      />
     <button onClick={sendData}>
       add task
      </button>

      <ul>
        {tasks.map((task, index) => (
  <li key={index}>{task.title}</li>
))}
      </ul>
      </div>
  );
}

export default App;
