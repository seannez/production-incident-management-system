//Incident card component.
//Links to incidentDetailsPage
import { Link } from "react-router-dom";

function IncidentCard({ incident }) {
    return(
        <article>

            <h2>{incident.title}</h2>
            <p>Severity: {incident.severity}</p>
            <p>Status: {incident.status}</p>
            <p>Affected Service: {incident.affectedService}</p>
            <p>Assigned To: {incident.assignedTo}</p>
            
            <Link to={`/incidents/${incident.id}`}>View Details</Link> 
        </article>
    )
}

export default IncidentCard;