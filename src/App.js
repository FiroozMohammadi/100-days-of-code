import { useState } from 'react';
import './App.css';

function App() {
 // const task=["learn react","solve problem","play football"];

  const[tasks,setTasks]=useState([]);
  const[input, setInput]=useState("");
  const [editIndex, setEditIndex] = useState(null);

  function addTask() {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }

    setInput("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index) {
    setInput(tasks[index]);
    setEditIndex(index);
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
    <div className='container'>
      <h1>Styling clean UI - Day 7</h1>
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
        placeholder="Add or edit task"
      />
     <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

    <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
