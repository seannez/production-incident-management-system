// Placeholder for dashboard controller.

import * as dashboardService
  from "../services/dashboardService.js";

export async function getDashboardSummary(req, res){
    try {
        const result = await dashboardService.getDashboardSummary()

        res.status(200).json(result)
    } catch (error) {
        console.log("Failed to get dashboard:", error)

        return res.status(500).json({message: "unable to fetch dashboard summary"})
    }
}