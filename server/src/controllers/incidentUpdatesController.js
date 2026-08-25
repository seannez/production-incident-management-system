// Placeholder for incident updates controller.
import * as incidentUpdatesService
  from "../services/incidentUpdatesService.js";

  export async function getIncidentUpdates(req, res){
    try {
        const id = Number(req.params.id)
        const result = await incidentUpdatesService.getIncidentUpdates(id)

        return res.status(200).json(result)
    } catch (error) {
        console.error("Failed to create incident update:", {
        message: error.message,
        code: error.code,
        detail: error.detail,
        position: error.position,
        table: error.table,
        column: error.column,
        constraint: error.constraint,
        stack: error.stack,
    });

    return res.status(500).json({
        message: "Failed to create update",
        });
    }
  }

  export async function createIncidentUpdate(req, res){
    try {
        const id = Number(req.params.id)
        const update = await incidentUpdatesService.createIncidentUpdate(id,
        req.body
    )
    res.status(201).json(update)
        
    } catch (error) {
        console.error("Failed to create incident update:", {
        message: error.message,
        code: error.code,
        detail: error.detail,
        position: error.position,
        table: error.table,
        column: error.column,
        constraint: error.constraint,
        stack: error.stack,
     });

  return res.status(500).json({
        message: "Failed to create update",
        });
    }
    
  }