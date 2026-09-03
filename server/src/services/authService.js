import bcrypt from "bcrypt";

import {
  findUserByEmail,
  findUserById,
  createUser,
} from "../repositories/usersRepository.js";

import {
  findTeamById,
} from "../repositories/teamsRepository.js";

export async function registerUser({name, email, password, teamId}){
    const cleanName = name?.trim()
    const cleanEmail = email?.trim().toLowerCase()
    const numericTeamId = Number(teamId);

    if(!cleanName || !cleanEmail || !numericTeamId){
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

export async function loginUser({email, password}){
  const cleanEmail = email?.trim().toLowerCase()

  if(!cleanEmail || !password){
    throw new Error("INVALID-LOGIN-DATA")
  }

  const user = await findUserByEmail(email)

  if(!user){
    throw new Error("")
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    teamId: user.teamId,
  };
}

export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}