import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const[tasks,setTasks]=useState([]);
    const[input,setInput]=useState("");
    const[editId, setEditId]=useState(null);

    const API_URL="https://localhost:7107/api/task";
    useEffect(()=>{
      fetch(API_URL)
      .then(res=>res.json())
      .then(data=>setTasks(data))
      .catch((err)=>console.log(err));
    },[]);
function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setTasks(data));
    });
}

function editTask(task){
  setInput(task.title);
  setEditId(task.id);
}
     
   
  function sendData() {
  if (input.trim() === "") return;
if (editId !== null) {
  fetch(`${API_URL}/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: input }),
  })
    .then(() => {
      // reload data after update
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          setTasks(data);
          setInput("");
          setEditId(null);
        });
    });

  } 
  else {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: input }),
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setInput("");
      });
  }
}


  return (
  <div className="container">
    <h1>Task Manager</h1>

    <div className="input-group">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={sendData}>
        {editId ? "Update" : "Add"}
      </button>
    </div>

    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>

          <div className="actions">
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editTask(task)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;
