// Placeholder for incident details page.
import { Link, useParams } from "react-router-dom";
import {
  fetchIncidentsUpdates,
  createIncidentUpdate,
} from "../api/incidentsApi";
import { useState } from "react";
import { useEffect } from "react";
import IncdentUpdateForm from "../components/incidents/IncidentUpdateForm";

function IncidentDetailsPage({incidents, onStatusChange}) {
  const [updates, setUpdates] = useState([])
    const id = useParams().id;
    const incident = incidents.find((incident) => incident.id === Number(id));
    const incidentId = incident?.id;

    //API Call
    async function loadUpdates(targetIncidentId) {
      const data = await fetchIncidentsUpdates(targetIncidentId);
      setUpdates(data);
    }

    useEffect(() => {
      if (!incidentId) {
        return;
      }

      loadUpdates(incidentId);
    }, [incidentId]);

    if (!incident) {
      return (
        <main className="panel incident-details-page">
          <p>Loading incident...</p>
        </main>
      );
    }

    async function handleCreateUpdate(updateData){
      const newUpdate = await createIncidentUpdate(incident.id, updateData)

      setUpdates((prevUpdates)=>[...prevUpdates, newUpdate])

    }

    async function handleStatusChange(newStatus) {
      await onStatusChange(incident.id, newStatus);

      await loadUpdates(incident.id);
    }
    return(
        <main className="panel incident-details-page">
            <div className="meta">
                <h2>{incident.title}</h2>
                <div>ID: {incident.id}</div>
            </div>

            <div className="incident-controls">
                <div className="incident-control">
                    <div className="incident-control-label">Severity</div>
                    <div className={`badge sev-${incident.severity}`}>{incident.severity}</div>
                </div>

                <div className="incident-control incident-status-control">
                    <label className="incident-control-label" htmlFor="incident-status">Status</label>
                    <select
                      id="incident-status"
                      value={incident.status}
                      onChange={(event) => handleStatusChange(event.target.value)}
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
            <section className="incident-updates-section">
              <div className="incident-updates-heading">
                <div>
                  <h3>Incident Updates</h3>
                  <p>Record progress and important changes.</p>
                </div>
              </div>

              <IncdentUpdateForm onCreateUpdate={handleCreateUpdate} />

              <div className="incident-updates-list">
                {updates.length === 0 ? (
                  <p className="incident-updates-empty">No updates yet.</p>
                ) : (
                  updates.map((update) => (
                    <article className="incident-update" key={update.id}>
                      <div className="incident-update-marker" />
                      <div>
                        <p className="incident-update-message">{update.message}</p>
                        <div className="incident-update-meta">
                          <span>{update.createdBy}</span>
                          <span>{new Date(update.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>

            <div className="incident-details-footer">
              <Link to="/incidents">← Back to Incidents</Link>
            </div>
        </main>
    )
}

export default IncidentDetailsPage;
