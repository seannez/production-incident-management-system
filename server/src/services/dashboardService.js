// Placeholder for dashboard service.
import { getDashboardSummary as getDashboardSummaryRepository }
  from "../repositories/dashboardRepository.js";

export async function getDashboardSummary() {
  return getDashboardSummaryRepository();
}