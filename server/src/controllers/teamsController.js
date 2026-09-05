import { getAllTeams, getAllTeamsWithMembers } from "../services/teamsService.js";

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

export async function getTeamsMembers(req, res){
  try {
    const teamsWithMembers = await getAllTeamsWithMembers()

    res.status(200).json(teamsWithMembers)
  } catch (error) {
    console.log("Failed to fetch teams with members:", error)

    res.status(500).json({message: "Failed fetch the teams"})
  }
}