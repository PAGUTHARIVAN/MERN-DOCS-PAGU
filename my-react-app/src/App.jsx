import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { JobApplicationForm } from "./pages/Apply.jsx";
import { Success } from "./pages/Success.jsx";
import { Users } from "./pages/Users.jsx";
import { UsersDetail } from "./pages/UserDetails.jsx";
import { TodoApp } from "./pages/Todo.jsx";
import "./App.css";
import { Notfound } from "./pages/Notfound.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todo" element={<TodoApp />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UsersDetail />} />
          <Route path="apply" element={<JobApplicationForm />} />
          <Route path="success" element={<Success />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
