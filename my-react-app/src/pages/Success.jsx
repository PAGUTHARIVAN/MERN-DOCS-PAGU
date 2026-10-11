import { Link, useLocation } from "react-router";

export const Success = () => {
  const location = useLocation();
  const name = location.state?.name;
  return (
    <div className="success-comp">
      <h1 className="thank">Thank you{name ? `, ${name}` : ""}</h1>
      <Link to="/" className="go">
        Go to Home
      </Link>
    </div>
  );
};
