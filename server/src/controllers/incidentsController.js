// Placeholder for incidents controller.
import pool from "../config/database.js";
import { findAllIncidents, findIncidentById , createIncident} from "../repositories/incidentsRepository.js";
import * as incidentsService from "../services/incidentsService.js";
const incidents = [
  {
    id: 1,
    title: "Payment API unavailable",
    description: "Payment requests are returning HTTP 500 errors.",
    severity: "critical",
    status: "open",
    affectedService: "Payments API",
    assignedTo: "Shon",
    createdAt: "2026-08-10T17:30:00",
  },
  {
    id: 2,
    title: "Slow database queries",
    description: "Several queries are taking more than 5 seconds.",
    severity: "high",
    status: "investigating",
    affectedService: "PostgreSQL",
    assignedTo: "Daniel",
    createdAt: "2026-08-10T16:15:00",
  },
  {
    id: 3,
    title: "Authentication timeout",
    description: "Some users are experiencing login timeouts.",
    severity: "medium",
    status: "resolved",
    affectedService: "Authentication Service",
    assignedTo: "Noa",
    createdAt: "2026-08-10T13:45:00",
  },
  {
  id: 4,
  title: "Email notifications delayed",
  description: "Incident alert emails are being delivered several minutes late.",
  severity: "low",
  status: "open",
  affectedService: "Notification Service",
  assignedTo: "Unassigned",
  createdAt: "2026-08-23T12:00:00",
}
];

export async function getAllIncidents(req, res){
    try {
        //go to repository
        const incidents = await findAllIncidents();
        return res.status(200).json(incidents);
    } catch (error) {
        console.error("Error fetching incidents:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getIncidentById(req, res) {
    const id = NUMBER(req.params.id)

    try {
        const incident = await findIncidentById(id);
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
        const newIncident = await createIncident(req.body)
        return res.status(201).json(newIncident)
    } catch (error) {
        
    }
}
