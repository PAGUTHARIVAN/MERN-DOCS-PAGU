import { Link } from "react-router";

//User Data
const users = [
  { id: 1, name: "Pagu", city: "Chennai" },
  { id: 2, name: "Raja", city: "Bengaluru" },
  { id: 3, name: "Kumar", city: "Hyderabad" },
  { id: 4, name: "Delhi", city: "Kolkata" },
  { id: 5, name: "Arun", city: "Mumbai" },
];

export const Users = () => {
  return (
    <div className="users-container">
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
