import { useState } from "react";
import { Navigate, useNavigate ,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/incidents" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await login(email, password);
      navigate("/incidents");
      
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">
          Login
        </button>
          <p>
          Don't have an account?{" "}
          <Link to="/register">
              Register
          </Link>
          </p>
      </form>
    </div>
  );
}