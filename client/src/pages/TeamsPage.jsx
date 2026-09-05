import { useEffect, useState } from "react";
import { fetchTeamsWithMembers } from "../api/teamsApi";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchTeamsWithMembers();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="teams-state panel">Loading teams...</p>;
  }

  if (error) {
    return <p className="teams-state teams-state-error panel">{error}</p>;
  }

  return (
    <main className="teams-page">
      <div className="teams-page-heading">
        <div>
          <h1>Teams</h1>
          <p>People responsible for keeping your services running.</p>
        </div>
        <span className="teams-count">
          {teams.length} {teams.length === 1 ? "team" : "teams"}
        </span>
      </div>

      <div className="teams-grid">
        {teams.map((team) => (
          <section className="team-card panel" key={team.id}>
            <header className="team-card-heading">
              <div className="team-icon" aria-hidden="true">
                {team.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2>{team.name}</h2>
                <p>
                  {team.members.length} {team.members.length === 1 ? "member" : "members"}
                </p>
              </div>
            </header>

            <div className="team-members">
              {team.members.length === 0 ? (
                <div className="team-empty">
                  <span aria-hidden="true">—</span>
                  <p>No members assigned</p>
                </div>
              ) : (
                team.members.map((member) => (
                  <div className="team-member" key={member.id}>
                    <div className="team-member-avatar" aria-hidden="true">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="team-member-copy">
                      <strong>{member.name}</strong>
                      <p>{member.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
