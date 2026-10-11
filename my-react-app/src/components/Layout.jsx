import { NavLink, Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="container">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todo</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/apply">Apply</NavLink>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer>@ My React App</footer>
    </div>
  );
};
