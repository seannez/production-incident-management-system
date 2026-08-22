//Incidents page, flow starts from here
//This page => IncedentList component => IncidentCard component => finally the data
import IncidentFilters from "../components/incidents/IncidentFilters";
import { useState } from "react";
import IncidentList from "../components/incidents/IncidentList";
import { mockIncidents } from "../data/mockIncidents";
import EmptyState from "../components/common/EmptyState";

function IncidentsPage() {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedSeverity, setSelectedSeverity] = useState("all");
    const [searchTerm, setSearchTerm] = useState(""); //Filters by title of the incident


    
    //Filter then use in component
    const filteredIncidents =
       mockIncidents.filter((incident) => {
        const matchesStatus = selectedStatus === "all" || incident.status === selectedStatus;
        const matchesSeverity = selectedSeverity === "all" || incident.severity === selectedSeverity;
        const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.affectedService
       .toLowerCase()
       .includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesSeverity && matchesSearch;
       }//End of filter
    )
        
    return(
        <main>
            <h1>Production Incidents: </h1>
            <IncidentFilters
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedSeverity={selectedSeverity}
                onSeverityChange={setSelectedSeverity}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            {filteredIncidents.length === 0 ? (
                <EmptyState />
            ) : (
                <IncidentList incidents={filteredIncidents} />
            )}
        </main>
    )
}

export default IncidentsPage;