import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[tasks,setTasks]=useState(()=>{
    const saved=localStorage.getItem("tasks");
    return saved? JSON.parse(saved):[];
  });
  
 useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

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

  return (
    <div className="container">
      <h1>save item temporary - Day 8</h1>
  

    
    
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
