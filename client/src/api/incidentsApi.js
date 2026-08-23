// Placeholder for incident API calls.

export async function fetchIncidents() {
    const response = await fetch("http://localhost:3001/api/incidents");
    if (!response.ok) {
        throw new Error("Failed to fetch incidents");
    }
    return response.json();
}

export async function createIncident(incidentData) {
    const response = await fetch("http://localhost:3001/api/incidents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
    }); //End of fetch
    if (!response.ok) {
        console.log("STATUS:", response.status);
        console.log("BODY:", await response.text());
        throw new Error("Failed to create incident"); //Response in case of failure
    }
    return response.json();
}