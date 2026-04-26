import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[loading, setLoading]=useState(null);
  const[error,setError]=useState("");
    const[tasks,setTasks]=useState([]);
    const[input,setInput]=useState("");
    const[editId, setEditId]=useState(null);
    const[search,setSearch]=useState("");

    const API_URL="https://localhost:7107/api/task";
    useEffect(() => {
  setLoading(true);
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setTasks(data);
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to load data");
      setLoading(false);
    });
}, []);

    useEffect(()=>{
      fetch(API_URL)
      .then(res=>res.json())
      .then(data=>setTasks(data))
      .catch((err)=>console.log(err));
    },[]);

function deleteTask(id) {
  setLoading(true);

  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then(() => fetch(API_URL))
    .then(res => res.json())
    .then(data => {
     setTasks(data);
     setLoading(false);
    })
    .catch(() => {
      setError("Delete failed");
      setLoading(false);
    });
}

function editTask(task){
  setInput(task.title);
  setEditId(task.id);
}
     
   
  function sendData() {
  if (input.trim() === "") {
    setError("cannot be empty");
    return;
  }

  setError("");
  setLoading(true);

  const request = editId
    ? fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      })
    : fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });

  request
    .then(() => fetch(API_URL))
    .then(res => res.json())
    .then(data => {
      setTasks(data);
      setInput("");
      setEditId(null);
      setLoading(false);
    })
    .catch(() => {
      setError("Something went wrong");
      setLoading(false);
    });
}

  return (
  <div className="container">
  
    <h1>Task Manager</h1>
   {!loading && tasks.length > 0 &&
  tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  ).length === 0 && (
    <p>No matching tasks found...</p>
)}
    {error && <p style={{ color: "red" }}>{error}</p>}
   <input type='text'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder='search tasks...'
      style={{margin: "10px 0", padding: "10px"}}
      />
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
      {tasks
        .filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((task) => (
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
