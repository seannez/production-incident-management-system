import {
  findUpdatesByIncidentId,
  createIncidentUpdate as createIncidentUpdateRepository,
  findAllUpdates
}
  from "../repositories/incidentUpdatesRepository.js";


export async function getIncidentUpdates(incidentId){
    return await findUpdatesByIncidentId(incidentId)
}

export async function createIncidentUpdate(incidentId, updateData){
    return await createIncidentUpdateRepository(incidentId, updateData)
}

export async function getAllUpdates(){
  return await findAllUpdates();
}