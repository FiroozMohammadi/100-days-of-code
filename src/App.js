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
  const[posts,setPost]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res)=>res.json())
    .then((data)=>{setPost(data.slice(0,5));setLoading(false);});
  },[]);
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function sendData(){
    fetch("https://jsonplaceholder.typicode.com/posts",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: input,
        body: "User task",
        userId: 1,
      }),
    })
    .then((res)=>res.json())
    .then ((data)=>console.log(data));
  }
  function editTask(index) {
    setInput(tasks[index]);
    setEditIndex(index);
  }

  return (
    <div >
      <div className="container">
        <h1>sending data - Day 10</h1>
  

    
    
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
      <button onClick={sendData}>Send to API</button>
      </div>

      <div className="container"> 
        {loading?<p>loading...</p>:(        <ul>
        {posts.map((post)=>(<li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>))}
      </ul>)}

        </div>

    </div>
    
  );
}

export default App;
