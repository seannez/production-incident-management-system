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
      throw new Error("INVALID_REGISTRATION_DATA")
    }

    if(password.length < 8){
      throw new Error("PASSWORD_TOO_SHORT")
    }

    const existingUser = await findUserByEmail(email)

    if(existingUser){
      throw new Error("EMAIL_ALREADY_EXISTS")
    }

    const isValidTeam = findTeamById(teamId)

    if(!isValidTeam){
      throw new Error("INVALID_TEAM")
    }

    const passwordHash = await bcrypt.hash(password, 12)

     return createUser({name: cleanName, email: cleanEmail, passwordHash, teamId: numericTeamId,});
}