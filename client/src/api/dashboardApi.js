//API calls for dashboard.

import { API_BASE_URL } from "./config.js";

export async function fetchDashboardSummary() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return response.json();
}
