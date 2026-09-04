import { getAllTeams } from "../services/teamsService.js";

export async function getTeams(req, res) {
  try {
    const teams = await getAllTeams();

    return res.status(200).json(teams);
  } catch (error) {
    console.error("Failed to fetch teams:", error);

    return res.status(500).json({
      message: "Failed to fetch teams",
    });
  }
}