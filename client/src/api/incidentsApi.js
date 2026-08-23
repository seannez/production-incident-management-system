// Placeholder for incident API calls.

export async function fetchIncidents() {
    const response = await fetch("http://localhost:3001/api/incidents");
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
}