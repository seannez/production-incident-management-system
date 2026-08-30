// Placeholder for incidents service.
import { findAllIncidents, findIncidentById , createIncident, 
    updateStatus
} from "../repositories/incidentsRepository.js";
import { createIncidentUpdate } from "./incidentUpdatesService.js";

export async function getAllIncidents() {
    return await findAllIncidents();
}

export async function getIncidentById(id) {
    return await findIncidentById(id);
}

export async function makeIncident(incidentData){
    return await createIncident(incidentData)
}

export async function changeStatus(id, status){
    const incident = await findIncidentById(id)

    if(!incident){
        return null
    }

    const oldStatus = incident.status;
    const updatedIncident = await updateStatus(id, status);

    if(oldStatus !== status){
        await createIncidentUpdate(id, {message: `changes status from ${oldStatus} to ${status}`, 
        createdBy: "System"})
    }
    return updatedIncident;

}
