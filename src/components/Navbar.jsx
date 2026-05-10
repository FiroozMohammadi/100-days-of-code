function Navbar({ setUser }) {

  function logout() {

    localStorage.removeItem("token");

    setUser(null);
  }

  return (

    <div className="navbar">

      <h3>Dashboard</h3>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;