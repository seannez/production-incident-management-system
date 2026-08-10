//Incident card component.

function IncidentCard({ incident }) {
    return(
        <article>

            <h2>{incident.title}</h2>
            <p>Severity: {incident.severity}</p>
            <p>Status: {incident.status}</p>
            <p>Affected Service: {incident.affectedService}</p>
            <p>Assigned To: {incident.assignedTo}</p>
            
        </article>
    )
}

export default IncidentCard;