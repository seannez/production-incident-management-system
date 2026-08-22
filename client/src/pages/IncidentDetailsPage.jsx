// Placeholder for incident details page.
import { Link, useParams } from "react-router-dom";


function IncidentDetailsPage({incidents, onStatusChange}) {
    const id = useParams().id;
    const incident = incidents.find((incident) => incident.id === Number(id));

    if (!incident) {
        return (
            <main>
                <h1>Incident Not Found</h1>
                <Link to="/incidents">Back to Incidents</Link>
            </main>
        );
    }
    return(
        <main>
            <h1>{incident.title}</h1>
            <p>Severity: {incident.severity}</p>
            <div>
  <label htmlFor="incident-status">
    Status:
  </label>

  <select
    id="incident-status"
    value={incident.status}
    onChange={(event) =>
      onStatusChange(
        incident.id,
        event.target.value
      )
    }
  >
    <option value="open">Open</option>
    <option value="investigating">
      Investigating
    </option>
    <option value="resolved">
      Resolved
    </option>
  </select>
</div>
            <p>Affected Service: {incident.affectedService}</p>
            <p>Assigned To: {incident.assignedTo}</p>
            <Link to="/incidents">Back to Incidents</Link>
        </main>
    )
}

export default IncidentDetailsPage;