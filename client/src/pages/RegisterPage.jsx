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
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

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

        <div>
          <label>Team</label>

          <select
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

        {error && <p>{error}</p>}

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}