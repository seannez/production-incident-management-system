//API calls for dashboard.

export async function fetchDashboardSummary() {
  const response = await fetch(
    "http://localhost:3001/api/dashboard/summary"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return response.json();
}