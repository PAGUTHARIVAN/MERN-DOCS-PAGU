import { useNavigate, useParams } from "react-router";

//User Data
const users = [
  { id: 1, name: "Pagu", city: "Chennai" },
  { id: 2, name: "Raja", city: "Bengaluru" },
  { id: 3, name: "Kumar", city: "Hyderabad" },
  { id: 4, name: "Delhi", city: "Kolkata" },
  { id: 5, name: "Arun", city: "Mumbai" },
];

export const UsersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === Number(id));
  if (!user) return <p>404 - User not found</p>;
  return (
    <div className="users-list">
      <h1>{user.name}</h1>
      <p>City: {user.city}</p>
      <button onClick={() => navigate("/users")}>Back</button>
    </div>
  );
};
