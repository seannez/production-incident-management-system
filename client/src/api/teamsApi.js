import { API_BASE_URL } from "./config.js";

const API_URL = `${API_BASE_URL}/api/teams`;

export async function fetchTeams() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
}

export async function fetchTeamsWithMembers() {
  const response = await fetch(
    `${API_URL}/members`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch teams with members");
  }

  return response.json();
}
