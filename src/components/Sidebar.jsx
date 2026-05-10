import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>Task App</h2>

      <Link to="/tasks">Tasks</Link>

      <Link to="/profile">Profile</Link>

      <Link to="/settings">Settings</Link>

    </div>
  );
}

export default Sidebar;