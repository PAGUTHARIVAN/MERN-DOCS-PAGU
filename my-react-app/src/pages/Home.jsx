import { useNavigate } from "react-router";
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>Welcome to Dynamic webpage...</p>
      <button onClick={() => navigate("/todo")} className="go-to-todo">
        Go to Todo
      </button>
    </div>
  );
};
