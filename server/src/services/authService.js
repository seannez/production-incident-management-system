import bcrypt from "bcrypt";

import {
  findUserByEmail,
  createUser,
} from "../repositories/usersRepository.js";

import {
  findTeamById,
} from "../repositories/teamsRepository.js";

export async function registerUser(name, email, password, teamId){
    const cleanName = name?.trim()
    const cleanEmail = email?.trim().toLoweCase()
    const numericTeamId = Number(teamId);

    if(!cleanName || !cleanEmail || numericTeamId){
      throw new Error("Invalid register data")
    }

    if(password.length < 8){
      throw new Error("password too short")
    }

    const existingUser = await findUserByEmail(email)

    if(existingUser){
      throw new Error("user with that email already exists")
    }

    const isValidTeam = findTeamById(teamId)

    if(!isValidTeam){
      throw new Error("invalid team")
    }

    const passwordHash = await bcrypt.hash(password, 12)

    return createUser({cleanName, cleanEmail, passwordHash, passwordHash})
}