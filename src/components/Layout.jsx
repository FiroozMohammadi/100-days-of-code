import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children, setUser }) {

  return (

    <div className="layout">

      <Sidebar />

      <div className="main-content">

        <Navbar setUser={setUser} />

        {children}

      </div>

    </div>
  );
}

export default Layout;