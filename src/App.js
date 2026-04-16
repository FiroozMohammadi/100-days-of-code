import { useState } from 'react';
import './App.css';

function App() {
 // const task=["learn react","solve problem","play football"];

  const[tasks,setTasks]=useState([]);
  const[input, setInput]=useState("");

  function addTask(){
    setTasks([...tasks,input]);
    setInput("");
  }
// const[message, setMessage]=useState("");
// const[name, setName]=useState("");


// function handlChange(event){
//   setName(event.target.value);
// }
//   function onClick(){
//     // alert("done");
//     setMessage("done");
//   }
  return (
    <div>
      <h1>Lists + map - Day 5</h1>
     {/* <Profile fullname="Fahim Rahimi" username="fahim11"/> */}
     {/* <button onClick={onClick}>Click</button> */}
     {/* <button onClick={()=> setMessage("clicked")}>click button</button> */}
     {/* <p>{message}</p> */}
     {/* <input type='text' onChange={handlChange} placeholder='Enter Name' /> */}
     {/* <input type='text' onChange={(e)=>setInput(e.target.value)} placeholder='Enter lastname' /> */}
     {/* <button onClick={()=>setName(input)}>click</button> */}
     {/* <p>{name}</p> */}

    
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add task"
      />
     <button onClick={addTask}>add task</button>

    <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
