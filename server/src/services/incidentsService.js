// Placeholder for incidents service.
import { findAllIncidents, findIncidentById , createIncident} from "../repositories/incidentsRepository.js";

export async function getAllIncidents() {
    return await findAllIncidents();
}

export async function getIncidentById(id) {
    return await findIncidentById(id);
}

export async function makeIncident(incidentData){
    return await createIncident(incidentData)
}