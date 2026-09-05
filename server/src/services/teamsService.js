import { findAllTeams, findTeamsWithMembers } from "../repositories/teamsRepository.js";

export async function getAllTeams() {
  return findAllTeams();
}

export async function getAllTeamsWithMembers(){
  return findTeamsWithMembers();
}