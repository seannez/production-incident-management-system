//Incidents page, flow starts from here
//This page => IncedentList component => IncidentCard component => finally the data
import IncidentFilters from "../components/incidents/IncidentFilters";
import { useState } from "react";
import IncidentList from "../components/incidents/IncidentList";
import { mockIncidents } from "../data/mockIncidents";

function IncidentsPage() {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const filteredIncidents =
        selectedStatus === "all" ? mockIncidents : mockIncidents.filter((incident) => incident.status === selectedStatus);
        
    return(
        <main>
            <h1>Production Incidents: </h1>
            <IncidentFilters
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
            />
            <IncidentList incidents = {filteredIncidents} />
        </main>
    )
}

export default IncidentsPage;