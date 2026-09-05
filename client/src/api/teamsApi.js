const API_URL = "http://localhost:3001/api/teams";

export async function fetchTeams() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
}

export async function fetchTeamsWithMembers() {
  const response = await fetch(
    "http://localhost:3001/api/teams/members",
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch teams with members");
  }

  return response.json();
}