import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { fetchTeams } from "../api/teamsApi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchTeams();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadTeams();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await registerUser({
        name,
        email,
        password,
        teamId: Number(teamId),
      });

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="register-page">
      <div className="login-brand">
        <div className="brand-mark" aria-hidden="true">!</div>
        <div>
          <strong>Incident Management</strong>
          <span>Operations</span>
        </div>
      </div>

      <section className="login-card">
        <div className="login-heading">
          <span className="login-eyebrow">Get started</span>
          <h1>Create your account</h1>
          <p>Join your team and start managing incidents.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="login-field">
            <label htmlFor="register-team">Team</label>
            <select
              id="register-team"
              value={teamId}
              onChange={(event) => setTeamId(event.target.value)}
            >
              <option value="">Select a team</option>

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button className="login-submit" type="submit">
            Create account
          </button>

          <p className="login-register">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
