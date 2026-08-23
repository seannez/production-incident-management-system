// Placeholder for incidents service.
import { findAllIncidents } from "../repositories/incidentsRepository.js";

export async function getAllIncidents() {
    return await findAllIncidents();
}