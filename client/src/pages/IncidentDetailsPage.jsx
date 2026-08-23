// Placeholder for incident details page.
import { Link, useParams } from "react-router-dom";


function IncidentDetailsPage({incidents, onStatusChange}) {
    const id = useParams().id;
    const incident = incidents.find((incident) => incident.id === Number(id));

    if (!incident) {
        return (
            <main className="panel">
                <h1>Incident Not Found</h1>
                <Link to="/incidents">Back to Incidents</Link>
            </main>
        );
    }
    return(
        <main className="panel">
            <div className="meta">
                <h2>{incident.title}</h2>
                <div>ID: {incident.id}</div>
            </div>

            <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div>
                    <div style={{fontSize:13,color:'#6b7280'}}>Severity</div>
                    <div className={`badge sev-${incident.severity}`}>{incident.severity}</div>
                </div>

                <div>
                    <div style={{fontSize:13,color:'#6b7280'}}>Status</div>
                    <select
                      id="incident-status"
                      value={incident.status}
                      onChange={(event) => onStatusChange(incident.id, event.target.value)}
                    >
                      <option value="open">Open</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <p style={{marginTop:12}}><strong>Affected Service:</strong> {incident.affectedService}</p>
            <p><strong>Assigned To:</strong> {incident.assignedTo}</p>
            <p><strong>Created At:</strong> {new Date(incident.createdAt).toLocaleString()}</p>
            <div style={{marginTop:12}}>
                <h3>Description</h3>
                <p>{incident.description}</p>
            </div>

            <div style={{marginTop:12}}>
                <Link to="/incidents">Back to Incidents</Link>
            </div>
        </main>
    )
}

export default IncidentDetailsPage;