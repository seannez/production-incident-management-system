import {
  findUpdatesByIncidentId,
  createIncidentUpdate as createIncidentUpdateRepository,
  findAllUpdates
}
  from "../repositories/incidentUpdatesRepository.js";
  import { findUserById } from "../repositories/usersRepository.js";


export async function getIncidentUpdates(incidentId){
    return await findUpdatesByIncidentId(incidentId)
}
//Calls the repository
export async function createIncidentUpdate(incidentId, updateData, userId){
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return createIncidentUpdateRepository(
    incidentId,
    {
      message: updateData.message,
      createdBy: user.name,
      updateType: updateData.updateType ?? "manual",
    }
  );
}

export async function getAllUpdates(){
  return await findAllUpdates();
}
