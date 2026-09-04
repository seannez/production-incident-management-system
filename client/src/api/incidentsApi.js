// Placeholder for incident API calls.

export async function fetchIncidents() {
    const response = await fetch(
    "http://localhost:3001/api/incidents",
    {
      credentials: "include",
    }
  );
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

export async function upDateIncidentStatus(id, status){
    const response = await fetch (
        `http://localhost:3001/api/incidents/${id}/status`,
        {
           method: "PATCH", 
           headers :{ 
                "Content-Type": "application/json"
           },
           body: JSON.stringify({status})
        }
    )

    if(!response.ok){
        throw new Error("Failed to update incident status")
    }

    return response.json()
}

export async function fetchIncidentsUpdates(incidentId){
    const response = await fetch(`http://localhost:3001/api/incidents/${incidentId}/updates`)

    if(!response.ok){
        throw new Error("Failed to fetch incident updates")
    }

    return response.json()
}

export async function createIncidentUpdate(incidentId, updateData){
    const response = await fetch(
        `http://localhost:3001/api/incidents/${incidentId}/updates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    }); //End of fetch

    if(!response.ok){
        throw new Error("Failed to create update")
    }
    
    return response.json()
}
