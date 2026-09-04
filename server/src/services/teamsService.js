import { findAllTeams } from "../repositories/teamsRepository.js";

export async function getAllTeams() {
  return findAllTeams();
}