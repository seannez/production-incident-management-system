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
//All status changes go through here!
export async function changeStatus(id, status, userId){
    const incident = await findIncidentById(id)

    if(!incident){
        return null
    }

    const oldStatus = incident.status;
    const updatedIncident = await updateStatus(id, status);

    if(oldStatus !== status){
        //The message that will be displayed in the bottom of the incident
        //Calls createIncidentUpdate from incidentUpdateService
        await createIncidentUpdate(
            id,
            {
                message: `changes status from ${oldStatus} to ${status}`,
                updateType: "status_change",
            },
            userId
        )
    }
    return updatedIncident;

}
