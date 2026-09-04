const API_URL = "http://localhost:3001/api/teams";

export async function fetchTeams() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
}