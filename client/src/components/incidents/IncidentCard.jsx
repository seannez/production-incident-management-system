//Incident card component.
//Links to incidentDetailsPage
import { Link } from "react-router-dom";

function IncidentCard({ incident }) {
    const sevClass = `sev-${incident.severity || 'low'}`;
    const statusClass = `status-${(incident.status||'open').replace(/\s+/g,'')}`;
    return (
        <tr onClick={() => window.location.href = `/incidents/${incident.id}`}>
            <td>
                <div className="incident-title">{incident.title}</div>
                <div className="incident-description">{incident.description}</div>
            </td>
            <td>
                <span className={`badge ${sevClass}`}>{incident.severity}</span>
            </td>
            <td>
                <span className={`badge ${statusClass}`}>{incident.status}</span>
            </td>
            <td>{incident.assignedTo}</td>
            <td>{new Date(incident.createdAt).toLocaleString()}</td>
        </tr>
    );
}

export default IncidentCard;
