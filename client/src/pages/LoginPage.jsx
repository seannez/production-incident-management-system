import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
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
    <main className="login-page">
      <div className="login-brand" aria-label="Incident Management Operations">
        <div className="brand-mark" aria-hidden="true">!</div>
        <div>
          <strong>Incident Management</strong>
          <span>Operations</span>
        </div>
      </div>

      <section className="login-card">
        <div className="login-heading">
          <span className="login-eyebrow">Welcome back</span>
          <h1>Sign in to your account</h1>
          <p>Continue to Incident Management.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button className="login-submit" type="submit">
            Sign in
          </button>

          <p className="login-register">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
