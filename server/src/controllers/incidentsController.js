import * as incidentsService from "../services/incidentsService.js";

export async function getAllIncidents(req, res){
    try {
        const incidents = await incidentsService.getAllIncidents();
        return res.status(200).json(incidents);
    } catch (error) {
        console.error("Error fetching incidents:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getIncidentById(req, res) {
    const id = Number(req.params.id);

    try {
        const incident = await incidentsService.getIncidentById(id);
        if (!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        return res.status(200).json(incident);
    } catch (error) {
        console.error("Failed to fetch specific incident:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNewIncident(req, res) {
    try {
        const newIncident = await incidentsService.makeIncident(req.body);
        return res.status(201).json(newIncident);
    } catch (error) {
        console.error("Failed to create incident:", error);
        return res.status(500).json({ message: "Failed to create incident" });
    }
}

export async function upDateIncidentStatus(req, res){
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const updatedIncident = await incidentsService.changeStatus(id, status);

        if (!updatedIncident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }

        return res.status(200).json(updatedIncident);
    } catch (error) {
        console.error("Failed to update incident: ", error);

        return res.status(500).json({message: "failed to update incident"});
    }
}